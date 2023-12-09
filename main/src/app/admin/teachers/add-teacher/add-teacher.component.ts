import { Component } from '@angular/core';
import { TeachersService } from '../all-teachers/teachers.service'

import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
})
export class AddTeacherComponent {
  proForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Teacher',
      items: ['Teacher'],
      active: 'Add Teacher',
    },
  ];
  constructor(private addTeacherForm: UntypedFormBuilder, private teachersService:TeachersService) {
    this.proForm = this.addTeacherForm.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ['', [Validators.required]],
      education: [''],
      uploadFile: [''],
    });
  }
  onSubmit() {

    if (this.proForm.valid) {
    console.log('Form Value', this.proForm.value);
    console.log('Form Value:', this.proForm.value);
    // Add the following line to call the service method to add the student
    this.teachersService.addTeachers(this.proForm.value);
  }
}
}
