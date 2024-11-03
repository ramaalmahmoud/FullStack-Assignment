import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  users: any[] = [];

  title: string = '';
  description: string = '';
  assignedUserId: number | undefined;
  status: string = 'Pending';
  dueDate: Date | undefined;
  ngOnInit(): void {
    this.loadUsers();
  }
  constructor(private taskService: URLService, private router: Router) { }
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
  onSubmit(): void {
    debugger
    const formData = new FormData();
    formData.append('Title', this.title);
    formData.append('Description', this.description);
    formData.append('AssignedUserId', this.assignedUserId?.toString() || '');
    formData.append('Status', this.status);

    // Parse dueDate as Date if it exists and is a valid date
    if (this.dueDate) {
      const parsedDate = new Date(this.dueDate);
      formData.append('DueDate', parsedDate.toISOString());
    }

    debugger

    this.taskService.createTask(formData).subscribe({
      next: (data) => {
        console.log('Task created successfully', data);
        this.router.navigate(['/dashboard/tasks-list']);
      },
      error: (err) => {
        console.error('Error creating task', err);
      }
    });
  }
}
