import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { StudentsModule } from "../students/students.module";
import {TeachersModule} from "../teachers/teachers.module";
import {CoursesModule} from '../courses/courses.module';
import { AdminsComponent } from './admins/admins.component';
import { AddadminComponent } from './admins/addadmin/addadmin.component'
import {AdminserviceService} from './admins/adminservice.service';
import { DeleteComponent } from './admins/delete/delete.component';
import { EditadminComponent } from './admins/editadmin/editadmin.component';
import { AdmindetailsComponent } from './admins/admindetails/admindetails.component'

//import{AllTeachersComponent} from '../teachers/all-teachers/all-teachers.component'




@NgModule({
    declarations: [
      MainComponent,
      Dashboard2Component,
      AdminsComponent,
      AddadminComponent,
      DeleteComponent,
      EditadminComponent,
      AdmindetailsComponent



    ],





    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts'),
        }),
        NgScrollbarModule,
        NgApexchartsModule,
        ComponentsModule,
        SharedModule,
        StudentsModule,
        TeachersModule,
        CoursesModule


    ],
    providers: [AdminserviceService],
})
export class DashboardModule {}
