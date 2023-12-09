
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import {Courses} from '../all-course/ngx-datatable.model'
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

export interface DialogData {
  id: number;
  action: string;
  course: Courses;
}


@Component({
  selector: 'app-adddialog',
  templateUrl: './adddialog.component.html',
  styleUrls: ['./adddialog.component.scss']
})
export class AdddialogComponent {

action: string;
  dialogTitle: string;
  courseForm: UntypedFormGroup;
  course: Courses | undefined;
  constructor(
    public dialogRef: MatDialogRef<AdddialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.course.courseName;
      this.course = data.course;
    } else {
      this.dialogTitle = 'New Courses';
      const blankObject = {} as Courses;
      this.course = new Courses(blankObject);
    }
    this.courseForm = this.createCourseForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createCourseForm(): UntypedFormGroup {
    return this.courseForm = this.fb.group({
      courseName: ['', [Validators.required]],
      courseCode: [''],
      courseDetails: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      length: ['', [Validators.required]],
      price: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      studentsNumber: [''],
      contactNumber: ['', [Validators.required]],
      uploadFile: [''],
    });
  }
  onSubmit() {
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public closeDialog11(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.coursesServiceService.addCourses(this.courseForm.getRawValue());
    this.dialogRef.close();

  }


}

