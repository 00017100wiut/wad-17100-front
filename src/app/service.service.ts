import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

const baseUrl = 'http://localhost:5293/api/';

export interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  sku: number;
}

export interface AddedProduct {
  id: number;
  name: string;
  price: number;
  details: string;
  sku: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);
  constructor() {}

  getAllProducts() {
    return this.httpClient.get<Product[]>(baseUrl + 'Products');
  }

  getProductById(id: number) {
    return this.httpClient.get<Product>(baseUrl + 'Products/' + id);
  }

  editProduct(item: AddedProduct) {
    return this.httpClient.put(baseUrl + 'Products', item);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(baseUrl + 'Products/' + id);
  }

  createProduct(item: AddedProduct) {
    return this.httpClient.post<AddedProduct>(baseUrl + 'Products/', item);
  }
}
