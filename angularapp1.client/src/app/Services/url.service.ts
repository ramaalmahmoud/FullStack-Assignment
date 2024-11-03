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
  }

  saveAuthData(token: string, userRole: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', userRole);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

    getUsers(): Observable<any> {
      return this.http.get(`${this.apiUrl}/Users/GetAllUsers`);
  }
  // Get user by ID
  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Users/GetUserById/${userId}`);
  }
  // Add new user (you can implement this method based on your requirements)
  addUser(userData: any): Observable<any> {
    debugger
    return this.http.post(`${this.apiUrl}/Users/CreateUser`, userData);
  }

  // Update user
  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Users/UpdateUser/${userId}`, userData);
  }

  // Delete user
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}
