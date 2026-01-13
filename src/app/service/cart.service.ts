import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getCartCount() {
    return this.cartItemsSubject.asObservable();
  }
  private storageKey = 'cartItems';
  private cartItems: any[] = [];

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const storedCart = localStorage.getItem(this.storageKey);
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.cartItemsSubject.next(this.cartItems);
  }

  private saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    this.cartItemsSubject.next(this.cartItems);
  }

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

    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);

    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem(this.storageKey);
  }
  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}
