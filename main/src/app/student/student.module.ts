import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeworkComponent } from './homework/homework.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { DeleteDialogComponent as leaveDeleteComonent } from './leave-request/dialogs/delete/delete.component';
import { FormDialogComponent } from './leave-request/dialogs/form-dialog/form-dialog.component';
import { TimetableComponent } from './timetable/timetable.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeworkService } from './homework/homework.service';
import { LeaveRequestService as stdLeaveReqService } from './leave-request/leave-request.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { CourseinfoComponent } from './courseinfo/courseinfo.component';

import {StudentsService} from '../admin/students/all-students/students.service'
import {TeachersService} from '../admin/teachers/all-teachers/teachers.service';
import { CourschatComponent } from './courschat/courschat.component'

import {FirstwordsPipe} from '../admin/courses/firstwords.pipe'




import{CoursesModule} from '../admin/courses/courses.module'
//import{CourseannouncementComponent} from '../admin/courses/courseannouncement/courseannouncement.component'


@NgModule({
  declarations: [
    DashboardComponent,
    HomeworkComponent,
    LeaveRequestComponent,
    leaveDeleteComonent,
    FormDialogComponent,
    TimetableComponent,
    SettingsComponent,
    CourseinfoComponent,
    CourschatComponent,


  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    NgApexchartsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ComponentsModule,
    SharedModule,
    CoursesModule,


  ],


  exports: [CourschatComponent],

  providers: [HomeworkService, stdLeaveReqService, StudentsService, TeachersService,  ],
})
export class StudentModule {}
