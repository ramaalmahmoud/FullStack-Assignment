import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  userProfile: any = {};
  isEditing = false;

  constructor(private profileService: URLService) { }

  ngOnInit(): void {
    
    const userId = this.profileService.getUserId() 
    if (userId) {
      this.profileService.getUserProfile(userId).subscribe(
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
   
    if (!this.userProfile.name || !this.userProfile.email) {
      alert("Name and Email are required.");
      return;
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.userProfile.email)) {
      alert("Please enter a valid email address.");
      return;
    }

 
    if (this.userProfile.newPassword && !this.isStrongPassword(this.userProfile.newPassword)) {
      alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
      return;
    }

    const updatedProfile = {
      ...this.userProfile,
      ...(this.userProfile.oldPassword ? { oldPassword: this.userProfile.oldPassword } : {}),
      ...(this.userProfile.newPassword ? { newPassword: this.userProfile.newPassword } : {})
    };

    this.profileService.updateProfile(this.userProfile.id, updatedProfile).subscribe(
      (updatedData) => {
        this.userProfile = updatedData;
        this.isEditing = false;
        this.userProfile.oldPassword = null;
        this.userProfile.newPassword = null;
        alert("Profile updated successfully.");
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }

  isStrongPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

}
