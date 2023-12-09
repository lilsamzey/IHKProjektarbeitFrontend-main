


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../all-students/students.service';

export interface DialogData {
  StudentId: number;
  name: string;
  department: string;
  mobile: string;
}




export interface attandance {
  Attendance: boolean;
  AttendanceID: number;
  CourseID: number;
  Date: string;
  Explaining: string;
  RecordDate: string;
  StudentID: number;
  UserID: string;

}


@Component({
  selector: 'app-delete-attendance',
  templateUrl: './delete-attendance.component.html',
  styleUrls: ['./delete-attendance.component.scss']
})

export class DeleteAttendanceComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteAttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: attandance,
    public studentsService: StudentsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    console.log('it will be deleted')
  }
}
