import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent {
  users: any[] = []; // Array to hold user data

  constructor(private _ser: URLService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._ser.getUsers().subscribe(
      (data: any) => {
        this.users = data; // Assuming the API returns a list of users
        console.log(this.users)
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  openAddUserModal(): void {
   
    this.router.navigate(['dashboard/add-user']);
  }

  viewUser(userId: number): void {
    
    this.router.navigate(['/view-user', userId]);
  }

  editUser(userId: number): void {
    
    this.router.navigate(['dashboard/update-user', userId]);
  }

  deleteUser(userId: number): void {
    
    if (confirm('Are you sure you want to delete this user?')) {
      this._ser.deleteUser(userId).subscribe(
        () => {
          this.loadUsers(); 
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
