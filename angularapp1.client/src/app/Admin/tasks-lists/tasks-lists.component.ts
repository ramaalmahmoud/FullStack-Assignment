import { Component } from '@angular/core';
import { URLService } from '../../Services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.component.html',
  styleUrl: './tasks-lists.component.css'
})
export class TasksListsComponent {
  tasks: any[] = [];
  constructor(private _ser: URLService, private router: Router) { }

  ngOnInit(): void {
    this._ser.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
      }
    });
  }

}
