
import { Component, ElementRef, OnInit } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import {CoursedetailsComponent} from '../coursedetails/coursedetails.component'




import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {Courses} from './ngx-datatable.model'
import {DeleteDialogComponent} from '../deletedialog/deletedialog.component'

import {EditdialogComponent} from '../editdialog/editdialog.component'



import {
  MatSnackBar,

} from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatMenuTrigger } from '@angular/material/menu';
import { Direction } from '@angular/cdk/bidi';

import {

  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { AdddialogComponent } from '../adddialog/adddialog.component';


export interface DialogData {
  CourseId: number;
  action: string;
  course: Courses;
  firstName: string;
  lastName: string;
  gender: string;
}

// export class Courses {
//   CourseId!: number;
//   courseName!: string;
//   length: string | undefined;
//   price: number | undefined;
//   teacher: string | undefined;
//   startDate: Date | undefined;
//   enrolledStudents: Students[] | undefined;

//   constructor(init?: Partial<Courses>) {
//     Object.assign(this, init);
//   }
// }

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
})


export class AllCourseComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  [x: string]: any;





  selection = new SelectionModel<Courses>(true, []);

  searchQuery = '';

  id?: number;

  courses!: Courses[];


  displayData: any[]=[];


items:any[] =[]

exampleDatabase: any;
teachersService: any;











courseData:any[] = [];
totalCourses!:number;
totalStudents!:number;


filteredCourses: any[] = [];
searchText = '';



loading= true; // Initially set to true

loadingTemplate: any;




currentSorting = '';  // Şu anda hangi sütunun sıralandığını takip eder
isDescending = false;





  breadscrums = [
    {
      title: 'All Course',
      items: ['Course'],
      active: 'All Course',
    },
  ];
  constructor(public coursesServiceService:CoursesServiceService,
    public httpClient: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private location: Location,

    ) {
    super();
  }







  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };








  ngOnInit(){

console.log('all course conmponent')


this.getAllCourses();
this.CourseStudentCounts();


  }



  showBasicMessage() {
    Swal.fire('Here is a message!');
  }



  async getAllCourses() {
    this.loading = true; // Set the loading flag to true before fetching data
    try {
      this.courses = await this.coursesServiceService.allCourses();
      this.loading = false; // Set the loading flag to false after fetching data
    } catch (error) {
      console.error('Courses weren\'t found:', error);
      this.loading = true; // Set the loading flag to false even if there was an error
    }
  }









    CourseStudentCounts(){



      this.coursesServiceService.CourseStudentCounts().subscribe(data => {
        this.courseData = data; // API'den gelen verileri courseData'ya atıyoruz
        this.filterCourses();
        console.log(this.courseData)

        const chartData = this.courseData.map(course => {
          return {
            value: course.EnrolledStudents,
            name: course.CourseName,
          };
        });

      });

    }





    filterCourses() {
      this.filteredCourses = this.courseData.filter(course => {
        return course.courseName.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }



































  details(course: Courses) {

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(CoursedetailsComponent, {
      data: {
        course: course,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x: { id: number | undefined; }) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.teachersService.getDialogData();
          // And lastly refresh table
          // this.refreshTable();
          // this.showNotification(
          //   'black',
          //   'Edit Record Successfully...!!!',
          //   'bottom',
          //   'center'
          // );
        }
      }

    })}












    //of courseslist


addNew(){
  let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AdddialogComponent, {
      data: {
        course: this.courses,
        action: 'add',
      },
      direction: tempDirection,
    });



    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
           this.coursesServiceService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }

    });


}












  refreshTable() {
    throw new Error('Method not implemented.');
  }

  showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }



removeSelectedRows(){
  console.log("addnewbutton")
}
exportExcel(){
  console.log("addnewbutton")
}


refreshPage(): void {
  window.location.reload();
}






editCall(course: Courses) {
  this.id = course.CourseId;
  console.log(course)

  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(EditdialogComponent, {
    data: {
      course: course,
      action: 'edit',
    },
    direction: tempDirection,
  });



  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {



      // When using an edit things are little different, firstly we find record inside DataService by id
      const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
        (x: { id: number | undefined; }) => x.id === this.id
      );
      // Then you update that record using data from dialogData (values you enetered)
      if (foundIndex != null && this.exampleDatabase) {
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.teachersService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );


      }
    }
// After dialog is closed we're doing frontend updates
    //this.ngOnInit();
    this.getAllCourses();
  })}









deleteItem(course: Courses) {

  this.id = course.CourseId;

  console.log('delete item', this.id)
  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    data: course,
    direction: tempDirection,
  });

  this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
        (x: { CourseId: number | undefined; }) => x.CourseId === this.id
      );
      // for delete we use splice in order to remove single object from DataService
      if (foundIndex != null && this.exampleDatabase) {
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    }
    this.getAllCourses();
  });
}






sortTable(column: string) {
  if (this.currentSorting === column) {
    this.isDescending = !this.isDescending;
  } else {
    this.currentSorting = column;
    this.isDescending = false;
  }

  this.filteredCourses.sort((a, b) => {
    if (a[column] > b[column]) {
      return this.isDescending ? -1 : 1;
    } else if (a[column] < b[column]) {
      return this.isDescending ? 1 : -1;
    } else {
      return 0;
    }
  });
}




  }
