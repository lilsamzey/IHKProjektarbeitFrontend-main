

import { Injectable,  } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, } from 'rxjs';
import { environment } from 'environments/environment';

import {AuthService} from '../core/service/auth.service'
import Swal from 'sweetalert2';


import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public API_URL = `${environment.apiUrl}/users`; // API URL'si

  private coursesAPI = `${environment.apiUrl}/courses`; // API URL'si

  constructor(private httpClient: HttpClient, private authService:AuthService) {}

  course={}



  courseIdForCourseDetails!:number;








  getUserCourses(userId: any): Observable<any> {
    const url = `${this.API_URL}/${userId}/student/courses`; // Kullanıcı öğrenci kimliğini alacak URL'i oluşturun

    return this.httpClient.get<any>(url); // `get` isteği yaparak kullanıcı öğrenci kimliğini alın ve sonucu döndürün
  }




  // //getCourseDetails(courseId:any):void {
  //   const url = `${this.coursesAPI}/${courseId}`;


  //   this.httpClient.get(url)
  //     .subscribe({
  //       next: (data) => {
  //         this.course = data;


  //         console.log(this.course)
  //       },
  //       error: (error: HttpErrorResponse) => {
  //         console.log('error of getCoursesDetails') // error codcoe here
  //       },
  //     });
  // }



  getCurrentStudentId(userId: any): Observable<any> {
    const url = `${this.API_URL}/${userId}/getstudentId`;

    return this.httpClient.get<any>(url);
  }




  getAttendanceByCourseIdAndStudentId(courseid:number, studentId:number): Observable<any> {
    const url = `${this.coursesAPI}/${courseid}/studentattendance/${studentId}`;

    return this.httpClient.get<any>(url);
  }








  getFileCountOfCourse(courseId: number,): Observable<any[]> {

    console.log(courseId)
    return this.httpClient.get<any[]>(`${environment.apiUrl}/courses/${courseId}/filecountofcourse`);
  }






  getStudentSettingsInfo(userId: any): Observable<any> {
    const url = `${environment.apiUrl}/students/studentsettings/${userId}`;

    return this.httpClient.get<any>(url);
  }



  updateStudentsUserPassword(userId: number, password: string, student: string): Observable<void> {
    const data = { password: password };
    console.log(userId, password);

    return this.httpClient.put<void>(`${environment.apiUrl}/students/studentsettings/${userId}`, data)
      .pipe(
        tap(() => {
          this.showSuccess()

          //activity log
          this.authService.addActivityLog(
            this.authService.currentUserValue.id,
            'Student Password Updating',
            `Student ${student} updated his/her password. Students' userId=${userId}, New Password=${password}`);
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
