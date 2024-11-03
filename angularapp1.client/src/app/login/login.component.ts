import { Component } from '@angular/core';
import { URLService } from '../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private _ser: URLService, private router: Router) { }

  onLogin(): void {
    const loginData = new FormData();
    loginData.append('Email', this.email);
    loginData.append('Password', this.password);
   
    this._ser.login(loginData).subscribe({
     
      next: (response) => {
        console.log("userroles", response.userRoles)
        // Ensure UserRoles is an array and contains the expected roles
        if (response.userRoles[0]==='Admin') {
          
          this.router.navigate(['/dashboard/manageusers']);
        } else if (response.userRoles[0] === 'User') {
          this.router.navigate(['/user/UserProfile']);
        } else {
          this.errorMessage = 'You do not have permission to access the dashboard.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
  }


