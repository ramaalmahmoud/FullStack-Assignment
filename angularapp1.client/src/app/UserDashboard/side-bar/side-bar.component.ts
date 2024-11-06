import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  constructor(private _ser: URLService, private router: Router) { }
  
  logout(): void {
    this._ser.logout(); 
    this.router.navigate(['/login']); 
  }
}
