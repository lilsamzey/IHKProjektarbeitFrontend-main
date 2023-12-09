import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';



export interface DialogData {
  CourseId: number;
  courseName: string;

}

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.scss']
})

export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private location: Location,
    private snackBar: MatSnackBar,


  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    this.coursesServiceService.deleteCourses(this.data.CourseId, this.data.courseName);
    this.showAlert('Your Course: ' + this.data.courseName + ' DELETED.');
    console.log(this.data.CourseId)



  }



  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds (3 seconds in this example)
      verticalPosition: 'top' // Position the alert at the top of the screen
    });
  }










}
