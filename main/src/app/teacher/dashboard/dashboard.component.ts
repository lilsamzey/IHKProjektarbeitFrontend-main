import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';





import{AuthService} from '../../core/service/auth.service'
import {TeacherService} from '../teacher.service'

import {TeachercourseinfoComponent} from '../teachercourseinfo/teachercourseinfo.component'





import { MatDialog } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';











@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {


  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Teacher'],
      active: 'Dashboard',
    },
  ];


  userName!:string;
  userId!:number;
  studentId!: number;
  courses: any[] =[];





  constructor(private authService:AuthService,
    private teacherService:TeacherService,
    public dialog: MatDialog,



    ) {

  }













  ngOnInit() {

    this.userId=this.authService.currentUserValue.id
    this.userName=this.authService.currentUserValue.firstName
    this.getUsersCourses();


    console.log(this.userId)

    if (typeof this.userId === 'undefined') {
      console.log('someVariable is undefined!');
    }


  }









  getUsersCourses(): void {
    this.teacherService.getUserCourses(this.userId).subscribe(
      (courses: any) => {
        this.courses = courses;
        console.log('Courses of ',this.userName, courses);
        // Diğer işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error('Hata:', error);
      }
    );}





    details(course: any) {

      console.log('detaydan gelen' + course.CourseId)

      let tempDirection: Direction;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      const dialogRef = this.dialog.open(TeachercourseinfoComponent, {
        data: {
          course: course,
          action: 'edit',
        },
        direction: tempDirection,
      });
      // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      //   if (result === 1) {
      //     // When using an edit things are little different, firstly we find record inside DataService by id
      //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      //       (x: { id: number | undefined; }) => x.id === this.id
      //     );
      //     // Then you update that record using data from dialogData (values you enetered)
      //     if (foundIndex != null && this.exampleDatabase) {
      //       this.exampleDatabase.dataChange.value[foundIndex] =
      //         this.teachersService.getDialogData();
      //       // And lastly refresh table
      //       this.refreshTable();
      //       this.showNotification(
      //         'black',
      //         'Edit Record Successfully...!!!',
      //         'bottom',
      //         'center'
      //       );
      //     }
      //   }

      // })


    }









    // refreshTable() {
    //   throw new Error('Method not implemented.');
    // }
    // showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    //   throw new Error('Method not implemented.');
    // }

















}


