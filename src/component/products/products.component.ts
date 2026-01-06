import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcommService } from '../../app/service/ecomm.service';
import { AlertComponent } from '../../app/reusableComponent/alert/alert.component';
import { CartService } from '../../app/service/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  addproductFromVisible: boolean = false;
  productList: any[] = [];
  addProductObject: any = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };
  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';
  http = inject(HttpClient);

  constructor(
    private ecommService: EcommService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  triggerAlert(message: string, type: 'success' | 'danger' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  getProducts() {
    this.ecommService.getAllProducts().subscribe((response: any) => {
      if (response) {
        console.log(response);
        this.productList = response;
      } else {
        alert(response.message);
      }
    });
  }
  onclickAddProduct() {
    this.addproductFromVisible = !this.addproductFromVisible;
  }
  resetForm() {
    this.addProductObject = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    };
  }
  submitProduct() {
    this.ecommService.addProduct(this.addProductObject).subscribe({
      next: () => {
        this.resetForm();
        this.addproductFromVisible = false;
        this.getProducts();

        this.triggerAlert('Product added successfully!', 'success');
      },
      error: () => {
        this.triggerAlert('Failed to add product', 'danger');
      },
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.addProductObject.image = URL.createObjectURL(file);
    }
  }
  deleteProduct(productId: number) {
    this.ecommService.deleteProduct(productId).subscribe({
      next: () => {
        this.getProducts();
        this.triggerAlert('Product deleted successfully!', 'success');
      },
      error: () => {
        this.triggerAlert('Failed to delete product', 'danger');
      },
    });
  }
  addToCart(product: any) {
    this.cartService.addToCart(product);

    this.triggerAlert('Product added to cart!', 'success');
  }
}
