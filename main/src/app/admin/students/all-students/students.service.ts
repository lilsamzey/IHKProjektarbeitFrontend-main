import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Students } from './students.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';

import Swal from 'sweetalert2';
import { studentNotes } from '../studentnotes/studentnotes.model';
import { environment } from 'environments/environment';
import {AuthService} from '../../../core/service/auth.service'

@Injectable()




export class StudentsService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = `${environment.apiUrl}/students`;

  private coursesAPI = `${environment.apiUrl}/courses`; // API URL'si


  isTblLoading = true;
  dataChange: BehaviorSubject<Students[]> = new BehaviorSubject<Students[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Students;
  allStudents: any[] = [];
  error = ''; // Hata mesajını tutmak için bir değişken eklendi

  studentNotesData!: studentNotes;

  studentUserId!:number;


  studentUserName1!:string;
  studentUserPassword!:string;


  studentNotesId!:number
  studentNotesofStudentService: any[]=[];


  constructor(private httpClient: HttpClient, private authService:AuthService) {
    super();

  }

  get data(): Students[] {
    return this.dataChange.value;
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

  /** CRUD METHODS */

  getAllStudentss(): Promise<Students[]> {
    return new Promise<Students[]>((resolve, reject) => {
      this.httpClient.get<Students[]>(this.API_URL).subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data);
          this.allStudents = data;
          resolve(data);
        },
        error: (error: HttpErrorResponse) => {
          this.error = 'Failed to get students.'; // Hata mesajını atama
          reject(error);
        },
      });
    });
  }






  getStudentUsersByStudentId(studentId: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient.get<any>(`${this.API_URL}/${studentId}/users`)
        .subscribe({
          next: (result) => {


            resolve(result);

            this.studentUserName1=result.data[0].username;

            this.studentUserPassword=result.data[0].password;
            this.studentUserId=result.data[0].userId;
            console.log(result.data[0])

          },
          error: (error: HttpErrorResponse) => {
            reject(error);
          }
        });
    });
  }



reloadStudentsList(){
  this.getAllStudentss();
}






  addStudents(student: Students): void {
    this.dialogData = student;

    this.httpClient.post(this.API_URL, student).subscribe({
      next: (data) => {
        this.dialogData = student;
        Swal.fire('Student added');



         this.reloadStudentsList()

      },
      error: (error: HttpErrorResponse) => {
            console.error('Error:', error);
            Swal.fire('Student adding is not successful. Check email address. ');
      },
    });
  }

  updateStudents(id: number, students: Students): void {
    this.dialogData = students;

    this.httpClient
      .put(`${this.API_URL}/${id}`, students)
      .subscribe({
        next: (data) => {
          this.dialogData = students;

          

        this.reloadStudentsList()

        },
        error: (error: HttpErrorResponse) => {
          this.error = 'Failed to update student.'; // Hata mesajını atama
          console.error('Error:', error);
        },
      });
  }

  deleteStudents(id: number): void {


    this.httpClient
      .delete(`${this.API_URL}/${id}`)
      .subscribe({
        next: (data) => {
          console.log('deleted student: ', id);

          this.reloadStudentsList()
        },
        error: (error: HttpErrorResponse) => {
          this.error = 'Failed to delete student.'; // Hata mesajını atama
          console.log(error)
        },
      });
  }




  getStudentNotes(studentId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/studentNotes/${studentId}`);
  }


  addStudentNotes(note: studentNotes): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/studentnotes`, note);
  }


  updateStudentNotes(note: studentNotes): Observable<any> {
  return this.httpClient.put<studentNotes>(`${this.API_URL}/studentnotes/${note.StudentId}`, note); // `put` isteği yaparak notları güncelleyin ve sonucu döndürün
  }

  deleteStudentNotes(NoteId:number): Observable<any> {
  return this.httpClient.delete<number>(`${this.API_URL}/studentnotes/${NoteId}`);
  }












  getAllCoursesByStudentId(studentId: any): Observable<any> {
    const url = `${this.API_URL}/${studentId}/courses`; // Kullanıcı öğrenci kimliğini alacak URL'i oluşturun

    return this.httpClient.get<any>(url); // `get` isteği yaparak kullanıcı öğrenci kimliğini alın ve sonucu döndürün
  }










  getAttendanceByCourseIdAndStudentId(courseid:number, studentId:number): Observable<any> {
    const url = `${this.coursesAPI}/${courseid}/studentattendance/${studentId}`;

    return this.httpClient.get<any>(url);
  }




  updateStudentUserPassword(studentId: number, password:string): Observable<void> {
    const data = { password: password };
    console.log(studentId, password);

    return this.httpClient.put<void>(`${this.API_URL}/updatePassword/${studentId}`, data)
      .pipe(
        tap(() => {
          this.showSuccess()

         
        })
      );
  }







  
  showSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your password has been updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }


}










