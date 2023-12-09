import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCourseComponent } from './all-course/all-course.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AboutCourseComponent } from './about-course/about-course.component';
import {CousestatisticsComponent} from '../courses/cousestatistics/cousestatistics.component'


const routes: Routes = [
  {
    path: 'all-courses',
    component: AllCourseComponent
  },
  {
    path: 'add-course',
    component: AddCourseComponent
  },
  {
    path: 'edit-course',
    component: EditCourseComponent
  },
  {
    path: 'about-course',
    component: AboutCourseComponent
  },
  {
    path: 'courses-statistics',
    component: CousestatisticsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
