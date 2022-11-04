import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoffeeHandlerService } from './shared/services/coffee-handler.service';
import { Category, CategoryDTO, Product, SubCategory } from './shared/services/coffee.interface';
import { UtilitiesService } from './shared/services/utilities.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DeleteDialogComponent } from './shared/delete-dialog/delete-dialog.component';
import * as Aos from 'aos';
import { ConnectionErrorComponent } from './shared/connection-error/connection-error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';

  public highlightProducts = new BehaviorSubject<Product[] | null>(null);
  public categories = new BehaviorSubject<CategoryDTO[] | null>(null);
  public renderProductsSection = new BehaviorSubject<SubCategory[] | null>(null);
  public currentCategory: string = "Hot Drink";
  public isLoading = false;
  public starting = true;

  constructor(
    private coffeeHandlerService: CoffeeHandlerService,
    private utilitiesService : UtilitiesService,
    public dialog: MatDialog,
    private cdRef:ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.load();
    Aos.init();
    await Promise.all([
      this.getHighlightMenu(),
      this.getAllCategories()
    ]);
  }

  ngOnDestroy(): void {
    this.highlightProducts.unsubscribe();
    this.categories.unsubscribe();
  }

  load() : void {
    this.isLoading = true;
    if (this.starting) {
      setTimeout( () => {
        this.isLoading = false;
        this.starting = false
      }, 4000 );
    } else {
      setTimeout( () => {
        this.isLoading = false;
      }, 2000 );
    }
  }

  async getHighlightMenu() {
    this.coffeeHandlerService.getAllHighlightMenu().subscribe((products: Product[])=> { 
      let highlightProduct: Product[] = [];
      for (const product of products) {
        highlightProduct.push({
          ...product,
          decodeImage: this.utilitiesService.decodeBase64image(product.image) 
        });
      }
      this.highlightProducts.next(highlightProduct);
    });
  }

  async getAllCategories() {
    this.coffeeHandlerService.getAllCategories().subscribe((categories: Category[])=> { 
      let categoriesDTO: CategoryDTO[] = [];
      for (const category of categories) {
        categoriesDTO.push({
          id: category.id,
          name: category.name
        });
      }
      this.utilitiesService.setAllCategories(categories);
      this.categories.next(categoriesDTO);
      this.renderProductsSection.next(this.utilitiesService.getSubCategoriesByCategoryName("Hot Drink"));
    });
  }

  onSelectedCategory(event: CategoryDTO) {
    if (event && event.name) {
      this.currentCategory = event.name;
      this.renderProductsSection.next(this.utilitiesService.getSubCategoriesByCategoryName(event.name));
    }
  }

  openModal(subCategoryId: number, subCategoryName: string, product?: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width ='600px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: subCategoryId,
      name: subCategoryName,
      product: product
    };
    dialogConfig.enterAnimationDuration= "1000ms";
    dialogConfig.exitAnimationDuration= "1000ms";

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(async result => {
      if (result != 'cancel') {
        let newProduct: Product = result.product;
        let isNewProduct: boolean = result.isNewProduct;
        if (this.coffeeHandlerService.checkNoDatabaseConnection()) {
          this.openConnectionError();
        } else {
          if (isNewProduct) {
            await this.coffeeHandlerService.addNewProduct(newProduct);
          } else {
            if (product && product.id) {
              await this.coffeeHandlerService.modifyProduct(product.id, newProduct);
            }
          }
          this.load();
          setTimeout(() => this.updateProductList(subCategoryId), 500);
        }
      }

    });
  }

  getModifyItem(subCategoryId: number, subCategoryName: string, event: Product) {
    this.openModal(subCategoryId, subCategoryName, event);
  }

  getDialogConfigForSmallScreen(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width ='450px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.enterAnimationDuration= "1000ms";
    dialogConfig.exitAnimationDuration= "500ms";
    return dialogConfig;
  }

  openConnectionError() {
    this.dialog.open(ConnectionErrorComponent, this.getDialogConfigForSmallScreen());
  }

  openConfirmDialog(productId: number, subCategoryId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent,this.getDialogConfigForSmallScreen());

    dialogRef.afterClosed().subscribe(async result => {
      if (this.coffeeHandlerService.checkNoDatabaseConnection()) {
        this.openConnectionError();
      } else {
        if (result != 'cancel') {
          await this.coffeeHandlerService.removeProduct(productId);
          this.load();
          setTimeout(() => this.updateProductList(subCategoryId), 500);
        }
      }
    });
  }

  getDeletedProduct(productId: number, subCategoryId: number) {
    this.openConfirmDialog(productId, subCategoryId);
  }

  updateProductList(subCategoryId: number) {
    let newSubCategories: SubCategory[] = [];
    let updateProduct: Product[] = [];
    let subCategories: SubCategory[] = this.utilitiesService.getSubCategoriesByCategoryName(this.currentCategory) || [];
    let subcategory = subCategories.find(val => val.id === subCategoryId);
    this.coffeeHandlerService.getNewProductBySubCategoryId(subCategoryId).subscribe((product: Product[])=> { 
      product.forEach(item => {
        updateProduct.push({
          ...item, 
          decodeImage: this.utilitiesService.decodeBase64image(item.image)
        });
      });

      subcategory = {
        ...subcategory,
        products: [...updateProduct]
      }

      subCategories.forEach(val => {
        if (val.id == subCategoryId && subcategory) {
          newSubCategories.push(subcategory)
        } else {
          newSubCategories.push(val);
        }
      });

      this.utilitiesService.setSubCategoriesByCategoryName(this.currentCategory, newSubCategories);
      this.renderProductsSection.next(this.utilitiesService.getSubCategoriesByCategoryName(this.currentCategory));      
    });
  }

}
