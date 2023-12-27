
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TeachersService } from '../../teachers.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';

import { Teachers } from '../../teachers.model';
//import { formatDate } from '@angular/common';




export interface DialogData {
  id: number;
  action: string;
  teachers: Teachers;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent {
  action: string;
  dialogTitle: string;
  proForm: UntypedFormGroup;
  teachers: Teachers;
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public teachersService: TeachersService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.firstName;
      this.teachers = data.teachers;
    } else {
      this.dialogTitle = 'New Teachers';
      const blankObject = {} as Teachers;
      this.teachers = new Teachers(blankObject);
    }
    this.proForm = this.createContactForm();
  }



  breadscrums = [
    {
      title: 'Edit Teachers',
      items: ['Teacher'],
      active: 'Edit Teacher',
    },
  ];



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


  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      teacherId: [this.teachers.teacherId],  
      firstName: [
        this.teachers.firstName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')]
      ],
      lastName: [this.teachers.lastName],
      gender: [this.teachers.gender, [Validators.required]],
      mobile: [this.teachers.mobile, [Validators.required]],
      email: [
        this.teachers.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      address: [this.teachers.address],

      // Removed fields that are not in the Teachers class
    });
}





  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    //this.teachersService.addTeachers(this.proForm.getRawValue());
  }

  onSubmit(){
  console.log('Form Value first name22', this.proForm.value.firstName);

  console.log('Form Value:', this.proForm.value);
  // Add the following line to call the service method to add the student
 this.teachersService.updateTeachers(this.teachers.teacherId, this.proForm.value);

 this.dialogRef.close();
 }

}

