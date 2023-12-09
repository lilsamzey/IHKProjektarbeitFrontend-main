import { Component, ChangeDetectorRef } from '@angular/core';
import { StudentsService } from '../all-students/students.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],

})
export class AddStudentComponent {
  addStudentForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Student',
      items: ['Student'],
      active: 'Add Student',
    },
  ];

  constructor(
    private addForm: UntypedFormBuilder,
    private studentsService: StudentsService ,
    public dialogRef: MatDialogRef<AddStudentComponent>,
    private cdRef: ChangeDetectorRef,
    ) {
      this.addStudentForm = this.addForm.group({
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
        gender: ['', [Validators.required]],
        mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        email: ['', [Validators.required, Validators.email]],
        parentName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]+')]],
        parentNo: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        address: ['', [Validators.required]],
      });
      
  }







  onSubmit() {

    if (this.addStudentForm.valid) {
    console.log('Form Value:', this.addStudentForm.value);
    // Add the following line to call the service method to add the student
    this.studentsService.addStudents(this.addStudentForm.value);



  }




  //this.dialogRef.close();

}







}
