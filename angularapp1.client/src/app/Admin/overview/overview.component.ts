import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  statistics: any = {
    TotalUsers: 0,
    TotalTasks: 0,
    CompletedTasks: 0,
    PendingTasks: 0
  };

  constructor(private dashboardService: URLService) { }

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
 
    this.dashboardService.getDashboardOverview().subscribe(
      (data) => {
        this.statistics = data;
        console.log(this.statistics);  // For debugging
      },
      (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    );
  }
}
