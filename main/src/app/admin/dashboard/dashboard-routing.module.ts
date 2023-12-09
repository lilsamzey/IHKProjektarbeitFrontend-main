import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import {AdminsComponent} from './admins/admins.component'
import { DashboardComponent as StudentDashboard } from 'app/student/dashboard/dashboard.component';
import { DashboardComponent } from 'app/teacher/dashboard/dashboard.component';

import {AllStudentsComponent} from '../students/all-students/all-students.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main/allStudents',
    component: AllStudentsComponent,
  },

  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'admins',
    component: AdminsComponent,
  },
  {
    path: 'dashboard2',
    component: Dashboard2Component,
  },
  {
    path: 'teacher-dashboard',
    component: DashboardComponent,
  },
  {
    path: 'student-dashboard',
    component: StudentDashboard,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
