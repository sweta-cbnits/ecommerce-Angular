import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}
  private cartItems: any[] = [];

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: any) {
    const existing = this.cartItems.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1,
      });
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  clearCart() {
    this.cartItems = [];
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
