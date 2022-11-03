import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category, Product } from './coffee.interface';

@Injectable({
  providedIn: 'root'
})
export class CoffeeHandlerService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAllHighlightMenu(): Observable<Product[]> {
    return this.http.get("http://localhost:8080/products/highlight-menu").pipe(map((res : any) => res));
  }

  public getAllCategories(): Observable<Category[]> {
    return this.http.get("http://localhost:8080/categories").pipe(map((res : any) => res));
  }

  public addNewProduct(product: Product) {
    this.http.post<Product>('http://localhost:8080/products', product).subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  public removeProduct(productId: number) {
    this.http.delete<Product>(`http://localhost:8080/products/${productId}`).subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  public getNewProductBySubCategoryId(subCategoryId: number) {
    return this.http.get(`http://localhost:8080/products/${subCategoryId}/products`).pipe(map((res : any) => res));
  }

  public modifyProduct(produtId: number, product: Product) {
    this.http.post<Product>(`http://localhost:8080/products/${product.id}}`, product).subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }


}
