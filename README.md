User and Task Management System
Overview
This project is a user and task management system built using Angular (Frontend), .NET (Backend), and Bootstrap (UI Framework). It features role-based access control, where users can log in as either an Admin or a User. The Admin can manage users, tasks, and view statistics, while Users can only access tasks assigned to them. It also includes features like task comments, profile management, and notifications.

Features
1. User Login and Role-Based Access Control
Users can log in with a username and password.
Two roles: Admin and User.
Admin: Access to both user and task management sections.
User: Access only to tasks assigned to them.
2. Admin Dashboard
User Management: Create, edit, delete, and view users.
Task Management: Create, edit, assign, and delete tasks.
Task Comments: Admin and users can add comments to tasks, with timestamps and user information.
Dashboard Overview: View statistics on users, tasks, and task statuses (pending/completed).
3. User Dashboard
My Tasks: Users can view and manage their assigned tasks.
Task Status: Update the task status (e.g., "In Progress", "Completed").
Task Comments: Users can add comments on tasks assigned to them.
4. Profile Management
Users can view and update their personal details (name, email, and password).
Passwords are encrypted and stored securely.
Email addresses must be unique.
5. Real-Time Notifications (Advanced Feature)
Notifications are shown in real-time for task assignments, status changes, comments, and user management changes using WebSockets.
Notifications can be marked as read or unread.
6. Activity Log (Audit Trail)
Admin can view logs for key actions (login, task creation, user management, etc.).
Tech Stack
Frontend: Angular, Bootstrap
Backend: .NET Core (Web API)
Database: SQL Server
Authentication: JWT (JSON Web Tokens) for session management
Installation
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/user-task-management-system.git
cd user-task-management-system
2. Backend Setup (.NET Core)
Prerequisites:
.NET 6 or later
SQL Server (local or cloud database)
Steps:
Open the solution in Visual Studio.
Update the connection string in appsettings.json with your SQL Server credentials.
json
Copy code

 "ConnectionStrings": {
   "DefaultConnection": "Server=.;Database=TaskManagementDB;Trusted_Connection=True;TrustServerCertificate=True;"
 }
Run the application by clicking Start or using the following command:
bash
Copy code
dotnet run
3. Frontend Setup (Angular)
Prerequisites:
Node.js (version 12+)
npm (Node Package Manager)
Steps:
Navigate to the frontend directory.
Install dependencies:
bash
Copy code
npm install
Start the Angular development server:
bash
Copy code
ng serve
The application will be available at http://localhost:4200.

Usage
Login Page: Use the login form to authenticate as either an Admin or User.
Admin Dashboard: Admin can manage users, tasks, and view statistics.
User Dashboard: Users can view and update the status of their assigned tasks.
Profile Page: Both Admin and Users can update their personal details.
Real-Time Notifications: Notifications will appear in the UI for task assignments, task status changes, and more.
Running the Application
Run the Backend: Ensure your .NET Core Web API is running (by running dotnet run).
Run the Frontend: Ensure the Angular development server is running (by running ng serve).
Visit the Frontend: Open your browser and go to http://localhost:4200.
Database Setup
SQL Server: You can set up a local SQL Server instance or use a cloud database. Ensure that your database connection string is correct in appsettings.json.
Example connection string for local SQL Server:
json
Copy code
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=TaskManagementDb;Trusted_Connection=True;"
}
Database Schema: The database schema is attached, and since this project uses a Database-First approach with Entity Framework Core, you can generate the models and DbContext based on the existing SQL Server schema by running the provided SQL script.
bash
Copy code
dotnet ef database update


