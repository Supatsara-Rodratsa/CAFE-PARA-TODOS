import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CoffeeHandlerService } from './shared/services/coffee-handler.service';
import { Category, CategoryDTO, Product, SubCategory } from './shared/services/coffee.interface';
import { UtilitiesService } from './shared/services/utilities.service';

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
  // public allCurrentProducts: SubCategory[] | null | undefined;

  constructor(
    private coffeeHandlerService: CoffeeHandlerService,
    private utilitiesService : UtilitiesService
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getHighlightMenu(),
      this.getAllCategories()
    ]);
  }

  ngOnDestroy(): void {
    this.highlightProducts.unsubscribe();
    this.categories.unsubscribe();
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
      this.renderProductsSection.next(this.utilitiesService.getSubCategoriesByCategoryName(event.name));
    }
  }

}
