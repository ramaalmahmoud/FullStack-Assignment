import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  users: any[] = [];

  title: string = '';
  description: string = '';
  assignedUserId: number | undefined;
  status: string = 'Pending';
  dueDate: Date | undefined;
  taskId: number | undefined;

  constructor(private taskService: URLService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadTask();
  }

  loadUsers(): void {
    this.taskService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  loadTask(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id')); // Get the task ID from the route
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe(
        (task) => {
          this.title = task.title;
          this.description = task.description;
          this.assignedUserId = task.assignedUserId;
          this.status = task.status;
          this.dueDate = new Date(task.dueDate); // Make sure to convert to Date object
        },
        (error) => {
          console.error('Error fetching task', error);
        }
      );
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('Title', this.title);
    formData.append('Description', this.description);
    formData.append('AssignedUserId', this.assignedUserId?.toString() || '');
    formData.append('Status', this.status);

    if (this.dueDate) {
      const parsedDate = new Date(this.dueDate);
      formData.append('DueDate', parsedDate.toISOString());
    }

    if (this.taskId !== undefined) {
      this.taskService.updateTask(this.taskId!, formData).subscribe({
        next: (data) => {
          console.log('Task updated successfully', data);
          this.router.navigate(['/dashboard/tasks-list']);
        },
        error: (err) => {
          console.error('Error updating task', err);
        }
      });
    }
  }

}
