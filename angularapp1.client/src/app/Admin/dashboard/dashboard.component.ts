import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private _ser: URLService, private router: Router) { }

  
  logout(): void {
    this._ser.logout(); 
    this.router.navigate(['/login']); 
  }
}
