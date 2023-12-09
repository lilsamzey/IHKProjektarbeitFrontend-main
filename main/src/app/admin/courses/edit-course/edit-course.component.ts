import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss'],
})
export class EditCourseComponent {
  courseForm: UntypedFormGroup;
  formdata = {
    cName: 'PHP Development',
    cCode: 'IR43234',
    cDetails: 'Basic php course from beginning.',
    sDate: '2020-02-17T14:22:18Z',
    cTyme: '10:30',
    cPrice: '12.4$',
    pName: '2',
    maxStds: '130',
    contactNo: '1234567890',
    uploadFile: '',
  };
  breadscrums = [
    {
      title: 'Edit Course',
      items: ['Course'],
      active: 'Edit Course',
    },
  ];
  constructor(private fb: UntypedFormBuilder, private snackBar: MatSnackBar,) {
    this.courseForm = this.createContactForm();
  }
  onSubmit() {
    console.log('Form Value', this.courseForm.value);
    this.showAlert('Your Course: ' + this.courseForm.value.courseName + ' DELETED.');
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      cName: [this.formdata.cName, [Validators.required]],
      cCode: [this.formdata.cCode],
      cDetails: [this.formdata.cDetails, [Validators.required]],
      sDate: [this.formdata.sDate, [Validators.required]],
      cTyme: [this.formdata.cTyme, [Validators.required]],
      cPrice: [this.formdata.cPrice, [Validators.required]],
      pName: [this.formdata.pName, [Validators.required]],
      maxStds: [this.formdata.maxStds],
      contactNo: [this.formdata.contactNo, [Validators.required]],
      uploadFile: [this.formdata.uploadFile],
    });
  }











  showAlert(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds (3 seconds in this example)
      verticalPosition: 'top' // Position the alert at the top of the screen
    });
  }




}
