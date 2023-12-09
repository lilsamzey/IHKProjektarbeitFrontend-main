
import {AdminserviceService  } from '../adminservice.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, Input  } from '@angular/core';



import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
//import { Students } from '../../students.model';




export interface DialogData {
  adminID: number;
  action: string;
  admin: any;
}


@Component({
  selector: 'app-editadmin',
  templateUrl: './editadmin.component.html',
  styleUrls: ['./editadmin.component.scss']
})
export class EditadminComponent {





    action: string;
    dialogTitle: string;
    stdForm: UntypedFormGroup;
    admin: any;
    constructor(
      public dialogRef: MatDialogRef<EditadminComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      public adminserviceService: AdminserviceService,
      private fb: UntypedFormBuilder
    ) {
      // Set the defaults
      this.action = data.action;
      if (this.action === 'edit') {
        this.dialogTitle = data.admin.firstName;
        this.admin = data.admin;
      } else {
        this.dialogTitle = 'Admins';
        // const blankObject = {} as admin;
        // this.admin = new admin(blankObject);
      }
      this.stdForm = this.createEditForm();
    }


    breadscrums = [
      {
        title: 'Edit Student',
        items: ['Student'],
        active: 'Edit Student',
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
    createEditForm(): UntypedFormGroup {
      return this.fb.group({
        firstName: [
          this.admin.firstName,
          [Validators.required, Validators.pattern('[a-zA-Z]+')],
        ],
        lastName: [this.admin.lastName],

        email: [
          this.admin.email,
          [Validators.required, Validators.email, Validators.minLength(5)],
        ],
        // mobile: [this.admin.mobile],

        // address: [this.admin.address],

      });
    }
    submit() {
      // emppty stuff
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    public confirmAdd(): void {

      //this.studentsService.updateStudents(this.stdForm.getRawValue());
    }
    onSubmit() {
      console.log('Form Value first name', this.stdForm.value.first);

      console.log('Form Value:', this.admin.StudentId);
      // Add the following line to call the service method to add the student
     this.adminserviceService.updateAdmin(this.admin.adminId, this.stdForm.value);

     this.dialogRef.close();


    }


    ngOnInit(){
     console.log('edit student on init')

  }

  }







