import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts, IProductDetails } from '../models/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProducts[]>(this.url);
  }

  getProduct(id: number): Observable<IProductDetails> {
    return this.http.get<IProductDetails>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.url, product);
  }

  updateProducts(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.url}/${id}`);
  }

  postProductToBasket(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  getProductsFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  updateProductsToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number): Observable<IProducts> {
    return this.http.delete<IProducts>(`${this.urlBasket}/${id}`);
  }
}
