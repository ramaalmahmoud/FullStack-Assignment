import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css'
})
export class UserTasksComponent {
  tasks: any[] = [];
  userId!: number; 

  constructor(private taskService: URLService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    debugger
    const id = this.taskService.getUserId();
    if (id !== null) {
      this.userId = id; 
    } else {
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
    debugger
    this.router.navigate(['/user/viewTask', task.id]);

  }
  onStatusChange(task: any): void {
    this.taskService.updateTaskStatus(task.id, task.status).subscribe({
      next: () => {
        console.log(`Task status updated to ${task.status}`);
      },
      error: (error) => {
        console.error('Error updating task status:', error);
      }
    });
  }
  markComplete(task: any): void {
    task.status = 'Completed';
    this.onStatusChange(task);
  }
}
