


import { Component, ChangeDetectorRef } from '@angular/core';
import { AdminserviceService} from '../adminservice.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent {
  addAdmintForm: UntypedFormGroup;
  breadscrums = [
    {
      title: 'Add Admin',
      items: ['Admins'],
      active: 'Add Admin',
    },
  ];

  constructor(
    private addForum: UntypedFormBuilder,
    private adminserviceService: AdminserviceService ,
    public dialogRef: MatDialogRef<AddadminComponent>,
    private cdRef: ChangeDetectorRef,
    ) {
    this.addAdmintForm = this.addForum.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      // mobile: ['', [Validators.required]],
      // address: [''],

    });
  }







  onSubmit() {

    if (this.addAdmintForm.valid) {
    console.log('Form Value:', this.addAdmintForm.value);
    // Add the following line to call the service method to add the student
    this.adminserviceService.addAdmins(this.addAdmintForm.value);



  }


  this.dialogRef.close();

}







}
