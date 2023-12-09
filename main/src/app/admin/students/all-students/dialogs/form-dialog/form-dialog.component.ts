import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../students.service';
import {
  UntypedFormControl,
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import { Students } from '../../students.model';
import Swal from 'sweetalert2';


export interface DialogData {
  id: number;
  action: string;
  students: Students;
}

@Component({
  selector: 'app-form-dialog:not(f)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {




  action: string;
  dialogTitle: string;
  stdForm: UntypedFormGroup;
  students: Students;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.firstName;
      this.students = data.students;
    } else {
      this.dialogTitle = 'New Students';
      const blankObject = {} as Students;
      this.students = new Students(blankObject);
    }
    this.stdForm = this.createContactForm();
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
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      studentId: [this.students.studentId],
      firstName: [
        this.students.firstName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')]
      ],
      lastName: [
        this.students.lastName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')]
      ],
      email: [
        this.students.email,
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      gender: [
        this.students.gender,
        [Validators.required]
      ],
      mobile: [
        this.students.mobile,
        [Validators.required, Validators.pattern('^[0-9]+$')]
      ],
      parentName: [
        this.students.parentName,
        [Validators.required, Validators.pattern('[a-zA-Z]+')]
      ],
      parentNo: [
        this.students.parentNo,
        [Validators.required, Validators.pattern('^[0-9]+$')]
      ],
      address: [
        this.students.address,
        [Validators.required]
      ]
    });
  }
  




  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.studentsService.addStudents(this.stdForm.getRawValue());
    //this.studentsService.updateStudents(this.stdForm.getRawValue());
  }











}
