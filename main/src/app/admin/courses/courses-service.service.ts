
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Courses } from './all-course/ngx-datatable.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Students } from '../students/all-students/students.model';
import { Observable } from 'rxjs';
import { Teachers } from '../teachers/all-teachers/teachers.model';
import { environment } from 'environments/environment';
import {AuthService} from '../../core/service/auth.service'

@Injectable({
  providedIn: 'root'
})


export class CoursesServiceService extends UnsubscribeOnDestroyAdapter {
  [x: string]: any;


  allCourseList:any[]=[]

  private readonly API_URL = `${environment.apiUrl}/courses`;

  isTblLoading = true;
  dataChange: BehaviorSubject<Courses[]> = new BehaviorSubject<Courses[]>([]);
  // Temporarily stores data from dialogs
  dialogData!: Courses;
  lastData:any []=[]
  constructor(public httpClient: HttpClient, private authService:AuthService) {
    super();
  }
  get data(): Courses[] {

    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  // getAllCourses(){

  //   return this.httpClient.get(this.API_URL);

  // }





  // getAllCourses() {
  //   this.httpClient.get(this.API_URL).subscribe({
  //     next: (res: any)=> {
  //        this.allCourseList=res;
  //       },

  //   error: (error) => console.log(error.message),

  //   complete: () => console.info('Api call completed')
  //     });


  //   }





    getAllCourses(){


      return this.httpClient.get<Courses>(this.API_URL);
    }




allCourses(): Promise<Courses[]> {
      return new Promise<Courses[]>((resolve, reject) => {
        this.httpClient.get<Courses[]>(this.API_URL).subscribe({
          next: (data) => {


            this.allCourseList = data;
            resolve(data);
          },
          error: (error: HttpErrorResponse) => {
            this['error'] = 'Failed to get students.'; // Hata mesajını atama
            reject(error);
          },
        });
      });
    }




    CourseStudentCounts(): Observable<any> {
      return this.httpClient.get(`${this.API_URL}/coursestudentcounts`);
    }

    // async CourseStudentCounts(): Promise<any> {
    //   try {
    //     const info = await this.httpClient.get(`${this.API_URL}/coursestudentcounts`).toPromise();
    //     return info;
    //   } catch (error) {
    //     console.error('Hata:', error);
    //     throw error; // veya istediğiniz gibi hata yönetimi yapabilirsiniz
    //   }
    // }

  //  CourseStudentCounts() {
  //     return this.httpClient.get<Courses>(`${this.API_URL}/coursestudentcounts`);
  //   }





  addCourses(course: Courses): void {
    this.dialogData = course;

    this.httpClient.post(this.API_URL, course)
      .subscribe({
        next: (data) => {
          this.dialogData = course;



           //activity log
        this.authService.addActivityLog(
          this.authService.currentUserValue.id,
         'Course Adding',
         `Course ${course.courseName}  is added.`);


          this.allCourses();

        },
        error: (error: HttpErrorResponse) => {
           // error code here
        },
      });
  }


  updateCourses(id:number, course: Courses): void {
    this.dialogData = course;

    this.httpClient.put(`${this.API_URL}/${id}`, course)
        .subscribe({
          next: (data) => {
            this.dialogData = course;


            //activity log
            this.authService.addActivityLog(
              this.authService.currentUserValue.id,
            'Course Updating',
            `Course ${course.courseName}  is updated.`);




          },
          error: (error: HttpErrorResponse) => {
             // error code here
          },
        });
  }
  deleteCourses(id: number, courseName:string): void {
    console.log(id);

    this.httpClient.delete(`${this.API_URL}/${id}`)
        .subscribe({
          next: (data) => {
            console.log('Deleted:' +id);


            //activity log
            this.authService.addActivityLog(
              this.authService.currentUserValue.id,
            'Course Updating',
            `Course ${courseName} is deleted. CourseId:${id}`);






          },
          error: (error: HttpErrorResponse) => {
            const errormessage = 'Failed to delete course.'; // Hata mesajını atama
            console.log(errormessage)
          },
        });
  }















  getEnrolledStudents(courseId: number): Promise<Students[]> {
    return this.httpClient.get<Students[]>(`${this.API_URL}/${courseId}/students`)
      .toPromise()
      .then(response => response || []);
  }



  enrollStudent(courseId: number, studentId: number): Observable<any> {
    const url = `${this.API_URL}/${courseId}/enroll`;

    console.log('courseserviceden' + courseId)
    const body = { studentId: studentId };

    return this.httpClient.post(url, body);
  }


  removeStudent(courseId: number, studentId: number): Observable<any> {


    return this.httpClient.delete(`${this.API_URL}/${courseId}/students/${studentId}`);
  }


  addAssignedTeacher(courseId: number, teacherId: number): Observable<any> {
    const url = `${this.API_URL}/${courseId}/assign`;

    console.log('courseserviceden' + courseId)
    const body = { teacherId: teacherId };

    return this.httpClient.post(url, body);
  }

  getAssignedTeachers(courseId: number): Promise<Teachers[]> {

    console.log('hallo' + courseId)
    return this.httpClient.get<Teachers[]>(`${this.API_URL}/${courseId}/teachers`)
      .toPromise()
      .then(response => response || []);
  }

  removeTeacher(courseId: number, teacherId: number): Observable<unknown> {


    return this.httpClient.delete(`${this.API_URL}/${courseId}/teachers/${teacherId}`);
  }



  saveStudentAttendance(courseId: number, attendanceData: any[]) {
    const url = `${this.API_URL}/:${courseId}/studentattendance`; // Sunucu tarafında uygun URL'yi belirtin

    return this.httpClient.post(url, attendanceData);

}






getCoursesAttendaceInfo(courseId: number){

  console.log('hallo' + courseId)
  return this.httpClient.get(`${this.API_URL}/${courseId}/courseattendance`)

  //return  this.httpClient.get(this.API_URL);

}


getAttendanceDetailsByDate(courseId: number, date:string){

  console.log('hallo' + courseId)
  return this.httpClient.get(`${this.API_URL}/${courseId}/courseattendancestudents/${date}`)

  //return  this.httpClient.get(this.API_URL);

}




getFileCountOfCourse(courseId: number,): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.API_URL}/${courseId}/filecountofcourse`);
}


}
