import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  userRole: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class URLService {
  private apiUrl = 'https://localhost:7165/api';

  constructor(private http: HttpClient) { }

  login(loginData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users/login`, loginData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId'); // Ensure to remove userId on logout
  }

  saveAuthData(token: string, userRole: string, userId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userId', userId.toString());
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Added method to retrieve the user ID from local storage
  getUserId(): number | null {
    debugger
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null; // Convert to number or return null
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Users/GetAllUsers`);
  }

  // Get user by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Users/GetUserById/${userId}`);
  }

  // Add new user
  addUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users/CreateUser`, userData);
  }

  // Update user
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Users/UpdateUser/${userId}`, userData);
  }

  // Delete user
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Users/${userId}`);
  }

  // Create a task
  createTask(task: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Tasks/CreateTask`, task);
  }

  // Get all tasks
  getTasks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Tasks/GetTasks`);
  }

  // Get a specific task by ID
  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Tasks/GetTask/${id}`);
  }

  // Update a task
  updateTask(id: number, task: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Tasks/UpdateTask/${id}`, task);
  }

  // Get assigned tasks for a user
  getAssignedTasks(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Tasks/GetUserTasks/${userId}`);
  }
}
