import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLService } from '../../Services/url.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  id: number;
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'User'; // Default value
  status: number = 1; // Default value
  errorMessage: string = '';

  // Define the available roles
  roles: string[] = ['Admin', 'User']; // Update this list as necessary

  constructor(private route: ActivatedRoute, private _ser: URLService, private router: Router) {
    this.id = this.route.snapshot.params['id']; // Get the user ID from the route
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails(): void {
    this._ser.getUserById(this.id).subscribe({
      next: (user) => {
        this.name = user.name;
        this.email = user.email;
        this.password=user.password
        this.role = user.userRoles;
        this.status = user.status;
      },
      error: (err) => {
        this.errorMessage = 'Error loading user details: ' + err.message;
      }
    });
  }

  onUpdateUser(): void {
    const userData = new FormData();
    userData.append('Name', this.name);
    userData.append('Email', this.email);
    userData.append('Password', this.password); 
    userData.append('Role', this.role);
    userData.append('Status', this.status.toString());

    this._ser.updateUser(this.id, userData).subscribe({
      next: () => {
      
        this.router.navigate(['/dashboard/manageusers']);
      },
      error: (err) => {
        this.errorMessage = 'Error updating user: ' + err.message;
      }
    });
  }
}
