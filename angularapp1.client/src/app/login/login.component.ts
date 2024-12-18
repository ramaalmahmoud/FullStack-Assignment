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
        console.log("userroles", response)

      
        if (response.userRoles[0]==='Admin') {
          this._ser.saveAuthData(response.token, response.userRoles[0], response.userId);

          this.router.navigate(['/dashboard/Overview']);
        } else if (response.userRoles[0] === 'User') {
          this._ser.saveAuthData(response.token, response.userRoles[0], response.userId); // Save  data

          this.router.navigate(['/user/UserProfile']);
        } else {
          this.errorMessage = 'You do not have permission to access the dashboard.';
        }
        
        if (response.forcePasswordChange) {
          alert("you need to change password")

        }
      },

      error: (err) => {
        this.errorMessage = 'Invalid email or password.';
      }
    });
  }
  }


