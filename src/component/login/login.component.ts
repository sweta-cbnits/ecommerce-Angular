import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EcommService } from '../../app/service/ecomm.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  http = inject(HttpClient);

  constructor(private ecommService: EcommService) {}
  userObj = { EmailId: '', Password: '' };

  logIn() {
    this.ecommService.loginUser(this.userObj).subscribe((response: any) => {
      if (response.result) {
        console.log(response);
        alert('Login successful');
        localStorage.setItem('loginUser', JSON.stringify(response.data));
        this.router.navigate(['/products']);
      } else {
        alert(response.message);
      }
    });
  }
}
