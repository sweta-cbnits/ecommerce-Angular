import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EcommService } from '../../app/service/ecomm.service';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../app/reusableComponent/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  http = inject(HttpClient);

  showAlert = false;
  alertMessage = '';
  alertType: 'success' | 'danger' = 'success';

  triggerAlert(message: string, type: 'success' | 'danger' = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }

  constructor(private ecommService: EcommService) {}
  userObj = { EmailId: '', Password: '' };

  logIn() {
    this.ecommService.loginUser(this.userObj).subscribe((response: any) => {
      if (response.result) {
        console.log(response);
        // alert('Login successful');
        localStorage.setItem('loginUser', JSON.stringify(response.data));
        this.triggerAlert('Login successful!', 'success');
        // this.router.navigate(['/products']);
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 2000);
      } else {
        // alert(response.message);
        this.triggerAlert('Login failed. Please try again.', 'danger');
      }
    });
  }
}
