import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EcommService {
  apiUrl: string = 'https://fakestoreapi.com/products';
  logInUserApiUrl: string =
    'https://freeapi.miniprojectideas.com/api/User/Login';

  constructor(private http: HttpClient) {}

  loginUser(userData: any) {
    return this.http.post(this.logInUserApiUrl, userData);
  }
  getAllProducts() {
    return this.http.get(this.apiUrl);
  }
  addProduct(productData: any) {
    return this.http.post(this.apiUrl, productData);
  }
  deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}
