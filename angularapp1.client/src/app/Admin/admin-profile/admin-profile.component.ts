import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  userProfile: any = {};
  isEditing = false;

  constructor(private profileService: URLService) { }

  ngOnInit(): void {
    
    const userId = this.profileService.getUserId() 
    if (userId) {
      this.profileService.getAdminProfile(userId).subscribe(
        (data) => {
          this.userProfile = data;
          console.log(this.userProfile)
        },
        (error) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
  }


  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveProfile(): void {
    // Check required fields and validate email and password strength
    if (!this.userProfile.name || !this.userProfile.email) {
      alert("Name and Email are required.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userProfile.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password strength if a new password is provided
    if (this.userProfile.newPassword && !this.isStrongPassword(this.userProfile.newPassword)) {
      alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    // Create an object with only the fields that need to be updated
    const updatedProfile = {
      ...this.userProfile,
      ...(this.userProfile.oldPassword ? { oldPassword: this.userProfile.oldPassword } : {}),
      ...(this.userProfile.newPassword ? { newPassword: this.userProfile.newPassword } : {})
    };

    this.profileService.updateProfile(this.userProfile.id, updatedProfile).subscribe(
      (updatedData) => {
        this.userProfile = updatedData;
        this.isEditing = false;
        // Clear password fields after save
        this.userProfile.oldPassword = null;
        this.userProfile.newPassword = null;
        alert("Profile updated successfully.");
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }

  // Helper method to validate password strength
  isStrongPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-]{8,}$/;
    return passwordRegex.test(password);
  }

}
