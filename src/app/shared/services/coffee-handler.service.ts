import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Category, Product } from './coffee.interface';

@Injectable({
  providedIn: 'root'
})
export class CoffeeHandlerService {

  private noDatabaseConnection: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  public getJSON(json: string): Observable<any> {
    return this.http.get(json);
  }

  public getAllHighlightMenu(): Observable<Product[]> {
    const _mockJsonURL = 'assets/mock-api/highligh-menu.json';
    return this.http.get("http://localhost:8080/products/highlight-menu").pipe(
      map((res : any) => res),
      catchError(() => {
        this.noDatabaseConnection = true;
       return this.getJSON(_mockJsonURL);
      }));
  }

  public getAllCategories(): Observable<Category[]> {
    const _mockJsonURL = 'assets/mock-api/all-categories.json';
    return this.http.get("http://localhost:8080/categories").pipe(
      map((res : any) => res),
      catchError(() => {
       return this.getJSON(_mockJsonURL);
      }));
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
    return this.http.get(`http://localhost:8080/products/${subCategoryId}/products`).pipe(
      map((res : any) => res),
      catchError(err => {
        console.log('jknkjnjk');
       return [];
      }));
  }

  public modifyProduct(_produtId: number, product: Product) {
    this.http.post<Product>(`http://localhost:8080/products/${product.id}}`, product).subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    })
  }

  public checkDatabaseConnection() {
    return this.noDatabaseConnection;
  }

}
