import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Category, Product, SubCategory } from './coffee.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  private allCategories: Category[] = []
  private categoriesMapping: { [key: string]: SubCategory[] } = {};

  constructor(
    private _sanitizer: DomSanitizer
  ) { }

  decodeBase64image(img: string | undefined) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${img}`);
  }

  setAllCategories(categories: Category[]) {
    this.allCategories = categories;
    this.allCategories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        if(subCategory && subCategory.products)  {
          let newProduct: Product[] = [];
          subCategory.products.forEach(product => {
            newProduct.push({
              ...product,
              decodeImage: this.decodeBase64image(product.image)
            });
          });
        
          subCategory = {
            ...subCategory,
            products: newProduct
          }
          
          if (this.categoriesMapping[`${category.name}`]) {
            this.categoriesMapping[`${category.name}`].push(subCategory);
          } else {
            this.categoriesMapping[`${category.name}`] = [subCategory];
          }
        }
      });
    });
  }

  getAllCategories() {
    return this.allCategories;
  }

  getCategoriesMapping() {
    return this.categoriesMapping;
  }

  getSubCategoriesByCategoryName(name: string) {
    return this.categoriesMapping[name] ? this.categoriesMapping[name] : null;
  }
}
