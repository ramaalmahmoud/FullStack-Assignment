import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this line

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageUserComponent } from './Admin/manage-user/manage-user.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SideBarComponent } from './UserDashboard/side-bar/side-bar.component';
import { UserProfileComponent } from './UserDashboard/user-profile/user-profile.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
import { UpdateUserComponent } from './Admin/update-user/update-user.component';
import { TasksListsComponent } from './Admin/tasks-lists/tasks-lists.component';
import { AddTaskComponent } from './Admin/add-task/add-task.component';
import { EditTaskComponent } from './Admin/edit-task/edit-task.component';
import { UserTasksComponent } from './UserDashboard/user-tasks/user-tasks.component';
import { ViewTaskComponent } from './UserDashboard/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageUserComponent,
    DashboardComponent,
    LoginComponent,
    SideBarComponent,
    UserProfileComponent,
    AddUserComponent,
    UpdateUserComponent,
    TasksListsComponent,
    AddTaskComponent,
    EditTaskComponent,
    UserTasksComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule,
    RouterModule.forRoot([
      { path: "", component: LoginComponent, pathMatch: "full" },

      {

        path: "dashboard",
        component: DashboardComponent,
        children: [

          { path: "manageusers", component: ManageUserComponent },
          { path: "add-user", component: AddUserComponent },
          { path: 'update-user/:id', component: UpdateUserComponent },
          { path: "tasks-list", component: TasksListsComponent },
          { path: "add-task", component: AddTaskComponent },
          { path: "edit-task/:id", component: EditTaskComponent }


        ]

      },
      {

        path: "user",
        component: SideBarComponent,
        children: [

          { path: "UserProfile", component: UserProfileComponent },
          { path: "assignedTasks", component: UserTasksComponent },
          { path: "viewTask/:id", component: ViewTaskComponent }
        ]

      },

    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
