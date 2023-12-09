

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

import Swal from 'sweetalert2';
import { studentNotes } from '../../students/studentnotes/studentnotes.model'
import { environment } from 'environments/environment';
import {AuthService} from '../../../core/service/auth.service'

@Injectable()




export class AdminserviceService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.apiUrl}/admins`;

 


 

  dialogData!: any;
  allAdmins: any[] = [];
  error = ''; 




  constructor(private httpClient: HttpClient, private authService:AuthService) {
    super();

  }





  getAllAdmins(): Observable<unknown> {

    return this.httpClient.get(this.API_URL);
  }










  addAdmins(admin: any): void {

    this.httpClient.post(this.API_URL, admin).subscribe({
      next: (data) => {

        Swal.fire('Admin added');


        

      },
      error: (error: HttpErrorResponse) => {
            console.error('Error:', error);
            Swal.fire('Admin adding is not successful. Check email address. ');
      },
    });
  }












  deleteAdmin(id: number, adminData:any): void {


    this.httpClient
      .delete(`${this.API_URL}/${id}`)
      .subscribe({
        next: (data) => {


         

          this.getAllAdmins();

       
        },
        error: (error: HttpErrorResponse) => {
          this.error = 'Failed to delete admin.';
          console.log(error)
        },
      });
  }







  updateAdmin(id: number, admin: any): void {
    this.dialogData = admin;


       this.httpClient
      .put(`${this.API_URL}/${id}`, admin)
      .subscribe({
        next: (data) => {
          this.dialogData = admin;

          

                

        },
        error: (error: HttpErrorResponse) => {
          this.error = 'Failed to update student.'; // Hata mesajını atama
          console.error('Error:', error);
        },
      });
  }









  getDialogData() {
    return this.dialogData;
  }



  showWithTitleMessage() {
    if(this.error!=''){
    Swal.fire(this.error);
    }
    this.error='';
  }

 





}