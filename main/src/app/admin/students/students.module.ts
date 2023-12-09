import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsRoutingModule } from './students-routing.module';
import { AboutStudentComponent } from './about-student/about-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { DeleteDialogComponent } from './all-students/dialogs/delete/delete.component';
import { FormDialogComponent } from './all-students/dialogs/form-dialog/form-dialog.component';
import { StudentsService } from './all-students/students.service';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { DeleteDialogComponent as StdDeleteDialogComponent } from './student-attendance/dialogs/delete/delete.component';
import { FormDialogComponent as StdFormDialogComponent } from './student-attendance/dialogs/form-dialog/form-dialog.component';
import { StudentAttendanceService } from './student-attendance/attendance.service';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { EditComponent } from './all-students/dialogs/edit/edit.component';
import { StudentsListComponent } from './all-students/students-list/students-list.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatDialogModule } from '@angular/material/dialog';



import { StudentnotesComponent } from './studentnotes/studentnotes.component';
import { DeleteAttendanceComponent } from './delete-attendance/delete-attendance.component'

@NgModule({



  declarations: [
    AboutStudentComponent,
    AddStudentComponent,
    EditStudentComponent,
    AllStudentsComponent,
    DeleteDialogComponent,
    FormDialogComponent,
    StudentAttendanceComponent,
    StdDeleteDialogComponent,
    StdFormDialogComponent,
    EditComponent,
    StudentsListComponent,
    StudentdetailsComponent,
    StudentnotesComponent,
    DeleteAttendanceComponent,




  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    ComponentsModule,
    SharedModule,
    NgScrollbarModule,
    DragDropModule,
    MatExpansionModule,
    MatDialogModule


  ],
  exports:[AddStudentComponent, AllStudentsComponent, StudentnotesComponent, StudentdetailsComponent
  ],
  providers: [StudentsService, StudentAttendanceService, AllStudentsComponent],
})
export class StudentsModule {}
