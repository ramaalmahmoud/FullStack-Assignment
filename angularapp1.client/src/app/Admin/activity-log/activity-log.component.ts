import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent {
  activityLogs: any[] = [];

  constructor(private activityLogService: URLService) { }

  ngOnInit(): void {
    this.loadActivityLogs();
  }

  loadActivityLogs(): void {
    this.activityLogService.getActivityLogs().subscribe(
      (logs) => {
        this.activityLogs = logs;
      },
      (error) => {
        console.error('Error fetching activity logs:', error);
      }
    );
  }
}
