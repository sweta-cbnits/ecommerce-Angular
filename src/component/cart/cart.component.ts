import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../app/service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotalPrice();
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }
}
