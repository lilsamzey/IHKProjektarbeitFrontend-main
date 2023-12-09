import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';
import { CoursesServiceService } from './courses-service.service';

import { MatPaginatorModule } from '@angular/material/paginator';
import { AdddialogComponent } from './adddialog/adddialog.component';
import { DeleteDialogComponent } from './deletedialog/deletedialog.component';
import { EditdialogComponent } from './editdialog/editdialog.component';
import { CoursedetailsComponent } from './coursedetails/coursedetails.component';
import { StudentsService } from '../students/all-students/students.service';
import { TeachersService } from '../teachers/all-teachers/teachers.service';

import { NgScrollbarModule } from 'ngx-scrollbar';

//import {CourschatComponent} from '../../student/courschat/courschat.component'


import { CoursedocumentsComponent } from './coursedocuments/coursedocuments.component';
import { CourseannouncementComponent } from './courseannouncement/courseannouncement.component'

import {AllStudentsComponent} from '../students/all-students/all-students.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StudentattandenceComponent } from './studentattandence/studentattandence.component';
import { CourseattendanceComponent } from './courseattendance/courseattendance.component';
import { CoursefileuploadComponent } from './coursefileupload/coursefileupload.component';


import { FilterPipe } from './filter.pipe';
import {FirstwordsPipe} from './firstwords.pipe';
import { CourseschartsComponent } from './coursescharts/coursescharts.component'





import { CousestatisticsComponent } from './cousestatistics/cousestatistics.component';
import { ApexchartComponent } from './apexchart/apexchart.component';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';










import { NgxEchartsModule } from 'ngx-echarts';
import { NgChartsModule } from 'ng2-charts';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { NgxGaugeModule } from 'ngx-gauge';















@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    AboutCourseComponent,
    AllCourseComponent,
    AdddialogComponent,
    DeleteDialogComponent,
    EditdialogComponent,
    CoursedetailsComponent,
    CoursedocumentsComponent,
    CourseannouncementComponent,
    StudentattandenceComponent,
    CourseattendanceComponent,
    CoursefileuploadComponent,
    FilterPipe,
    FirstwordsPipe,
    CourseschartsComponent,
    CousestatisticsComponent,
    ApexchartComponent,





  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    ComponentsModule,
    SharedModule,
    NgxDatatableModule,
    HttpClientModule,
    MatPaginatorModule,

    NgScrollbarModule,
    DragDropModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

    NgChartsModule,
    NgxChartsModule,
    NgApexchartsModule,
    NgxGaugeModule



  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  exports: [CourseannouncementComponent, CoursedocumentsComponent, StudentattandenceComponent, CoursefileuploadComponent, CourseschartsComponent],

  providers: [CoursesServiceService, StudentsService, TeachersService,  AllStudentsComponent, AllCourseComponent, ],


})
export class CoursesModule {}


