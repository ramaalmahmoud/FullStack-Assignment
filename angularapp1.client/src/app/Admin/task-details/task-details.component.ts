import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLService } from '../../Services/url.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  task: any;
  comments: any[] = [];
  newComment: string = '';

  constructor(private route: ActivatedRoute, private taskService: URLService) { }

  ngOnInit(): void {
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    this.loadTaskDetails(taskId);
  }

  loadTaskDetails(taskId: number): void {
    this.taskService.getTaskDetails(taskId).subscribe({
      next: (response) => {
        console.log('API response:', response);
        this.task = response;
        this.comments = response.comments;
        console.log('Task:', this.task);
        console.log('Comments:', this.comments);
      },
      error: (err) => console.error('Error fetching task details', err)
    });
  }


  addComment(): void {
    
    const commentData = {
      taskId: this.task.id,
      content: this.newComment,
      userId: Number(localStorage.getItem("userId"))
    }
    console.log("commentData")
    this.taskService.addComment(commentData).subscribe({
      next: () => {
        this.comments.push({ content: this.newComment, createdAt: new Date() });
        this.newComment = '';
        alert("comment added sucssesfully")
      },
      error: (err) => console.error('Error adding comment', err)
    });
  }
}
