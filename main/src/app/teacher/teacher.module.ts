import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { StudentsRoutingModule } from '../admin/students/students-routing.module';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgChartsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';



import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LecturesComponent } from './lectures/lectures.component';
import { DeleteDialogComponent } from './lectures/dialogs/delete/delete.component';
import { FormDialogComponent } from './lectures/dialogs/form-dialog/form-dialog.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { SettingsComponent } from './settings/settings.component';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { LecturesService } from './lectures/lectures.service';
import { LeaveRequestService } from './leave-request/leave-request.service';
import { ExamScheduleService } from './exam-schedule/exam-schedule.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { TeachercourseinfoComponent } from './teachercourseinfo/teachercourseinfo.component';


import { DragDropModule } from '@angular/cdk/drag-drop';


import {StudentModule} from '../student/student.module'



import {StudentsService} from '../admin/students/all-students/students.service'
import {TeachersService} from '../admin/teachers/all-teachers/teachers.service';
import { StudentinfoforteacherComponent } from './studentinfoforteacher/studentinfoforteacher.component';

import { StudentnotesforteacherComponent } from './studentnotesforteacher/studentnotesforteacher.component';
import {CoursesServiceService} from '../admin/courses/courses-service.service'

import{CoursesModule} from '../admin/courses/courses.module'








@NgModule({
    declarations: [
        DashboardComponent,
        LecturesComponent,
        DeleteDialogComponent,
        FormDialogComponent,
        LeaveRequestComponent,
        SettingsComponent,
        ExamScheduleComponent,
        TeachercourseinfoComponent,
        StudentinfoforteacherComponent,
        StudentnotesforteacherComponent,

    ],
    imports: [
      CommonModule,
      TeacherRoutingModule,
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
      StudentModule,
      StudentsRoutingModule,
      DragDropModule,
      CoursesModule

  ],
    providers: [LecturesService, LeaveRequestService, ExamScheduleService, StudentsService, TeachersService, CoursesServiceService],

})
export class TeacherModule {}
