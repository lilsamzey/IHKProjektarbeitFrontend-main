import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teachers } from './teachers.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';



import {AuthService} from '../../../core/service/auth.service'


@Injectable()
export class TeachersService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.apiUrl}/teachers`;
  isTblLoading = true;

  allTeachers:any[]=[];

  dataChange: BehaviorSubject<Teachers[]> = new BehaviorSubject<Teachers[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Teachers;
  constructor(private httpClient: HttpClient, private authService:AuthService) {
    super();
  }
  get data(): Teachers[] {


    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  // getAllTeacherss(): void {
  //   this.subs.sink = this.httpClient.get<Teachers[]>(this.API_URL).subscribe({
  //     next: (data) => {
  //       this.isTblLoading = false;
  //       this.dataChange.next(data);


  //     },
  //     error: (error: HttpErrorResponse) => {
  //       this.isTblLoading = false;
  //       console.log(error.name + ' ' + error.message);
  //     },
  //   });
  // }

  getAllTeacherss(): Promise<Teachers[]> {
    return new Promise<Teachers[]>((resolve, reject) => {
      this.httpClient.get<Teachers[]>(this.API_URL)
        .subscribe({
          next: (data) => {
            this.isTblLoading = false;
            this.dataChange.next(data);
            this.allTeachers=data;
            console.log(data)
            resolve(data);
          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          }
        });
    });
  }




  getTeacherUsersByTeacherId(teacherId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get<any>(`${this.API_URL}/${teacherId}/users`)
        .subscribe({
          next: (result) => {
            resolve(result);
            console.log(result.data.id);


          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          }
        });
    });
  }










  addTeachers(teachers: Teachers): void {
    this.dialogData = teachers;

    this.httpClient.post(this.API_URL, teachers)
      .subscribe({
        next: (data) => {
          this.dialogData = teachers;


          //insert activitylog
          this.authService.addActivityLog(
            this.authService.currentUserValue.id,
           'Teacher Adding',
           `Teacher ${teachers.firstName} ${teachers.lastName} is added`);




          Swal.fire('Teacher added');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error:', error);
          Swal.fire('Student adding is not successful. Check email address. ');
        },
      });
  }








  updateTeachers(id:number, teacher: Teachers): void {
    this.dialogData = teacher;

    this.httpClient.put(`${this.API_URL}/${id}`, teacher)
        .subscribe({
          next: (data) => {
            this.dialogData = teacher;

            //activity log
            this.authService.addActivityLog(
              this.authService.currentUserValue.id,
             'Teacher Update',
             `Teacher ${teacher.firstName} ${teacher.lastName} is updated. Teacher Nr: ${id}`);


          },
          error: (error: HttpErrorResponse) => {
            console.error('Error:', error);

          },
        });
  }


  deleteTeachers(id: number, teacher:any): void {


    this.httpClient.delete(`${this.API_URL}/ ${id}`)
        .subscribe({
          next: (data) => {
            console.log('Deleted:' +id);

            //activity log
            this.authService.addActivityLog(
              this.authService.currentUserValue.id,
             'Teacher Delete',
             `Teacher  ${teacher.firstName} ${teacher.lastName}  is deleted. Teacher Nr: ${id}`);



          },
          error: (error: HttpErrorResponse) => {
            console.error('Error:', error);

          },
        });
  }








}
