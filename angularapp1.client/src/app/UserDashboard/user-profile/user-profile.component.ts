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
    debugger
    const userId = this.profileService.getUserId() // Get from local storage or other source
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
    this.profileService.updateProfile(this.userProfile.id, this.userProfile).subscribe(
      (updatedProfile) => {
        this.userProfile = updatedProfile;
        this.isEditing = false;
      },
      (error) => {
        console.error('Error updating profile', error);
      }
    );
  }
}
