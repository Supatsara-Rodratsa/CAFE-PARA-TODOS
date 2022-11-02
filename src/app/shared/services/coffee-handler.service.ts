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
}
