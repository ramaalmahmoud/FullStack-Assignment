import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'] // Fixing the property name to 'styleUrls'
})
export class AddUserComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'User'; // Default value
  status: number = 1; // Default value
  errorMessage: string = '';

  // Define the available roles
  roles: string[] = ['Admin', 'User']; // Update this list as necessary

  constructor(private _ser: URLService, private router: Router) { }

  onAddUser(): void {
    
    const userData = new FormData();
    userData.append('Name', this.name);
    userData.append('Email', this.email);
    userData.append('Password', this.password);
    userData.append('Role', this.role);
    userData.append('Status', this.status.toString()); // Convert number to string

    this._ser.addUser(userData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/manageusers']);
      },
      error: (err) => {
        this.errorMessage = 'Error adding user: ' + err.message;
      }
    });
  }
}
