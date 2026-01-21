import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../constant/constant';

@Injectable({
  providedIn: 'root',
})
export class EcommService {
  // apiUrl: string = 'https://fakestoreapi.com/products';
  // logInUserApiUrl: string =
  //   'https://freeapi.miniprojectideas.com/api/User/Login';

  constructor(private http: HttpClient) {}

  loginUser(userData: any) {
    return this.http.post(constant.LOGIN_USER_API_URL, userData);
  }
  getAllProducts() {
    return this.http.get(constant.API_URL);
  }
  addProduct(productData: any) {
    return this.http.post(constant.API_URL, productData);
  }
  deleteProduct(productId: number) {
    return this.http.delete(`${constant.API_URL}/${productId}`);
  }
}
