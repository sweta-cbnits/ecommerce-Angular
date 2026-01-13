import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../app/service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  router = inject(Router);
  loggedUserData: any;
  cartCount: any;

  constructor(private cartService: CartService) {
    const loggedData = localStorage.getItem('loginUser');
    if (loggedData !== null) {
      this.loggedUserData = JSON.parse(loggedData);
    }
  }
  ngOnInit() {
    this.cartService.getCartCount().subscribe((items) => {
      this.cartCount = items.length;
    });
  }
  logout() {
    localStorage.removeItem('loginUser');
    this.router.navigate(['/login']);
  }
}
