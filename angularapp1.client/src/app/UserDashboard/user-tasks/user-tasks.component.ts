import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  tasks: any[] = [];
  userId!: number; // Use the non-null assertion operator

  constructor(private taskService: URLService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    debugger
    const id = this.taskService.getUserId();
    if (id !== null) {
      this.userId = id; // Assign only if it's a valid number
    } else {
      // Handle the case where userId is null (e.g., redirect to login or show an error)
      console.error('User ID is not available. Please log in again.');
    }
    this.fetchTasks();
  }

  fetchTasks(): void {
    debugger
    this.taskService.getAssignedTasks(this.userId).subscribe(
      (data) => this.tasks = data,
      (error) => console.error('Error fetching tasks', error)
    );
  }

  viewTask(task: any): void {
    // Logic for viewing task details
  }

  markComplete(task: any): void {
    //this.taskService.markTaskComplete(task.id, this.userId).subscribe(() => {
    //  task.status = 'Completed';
    //});
  }
}
