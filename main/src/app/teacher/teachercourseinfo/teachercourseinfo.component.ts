
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { CoursesServiceService } from '../../admin/courses/courses-service.service';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from '../../admin/students/all-students/students.service';
import { Students } from '../../admin/students/all-students/students.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teachers } from 'app/admin/teachers/all-teachers/teachers.model';
import { TeachersService } from 'app/admin/teachers/all-teachers/teachers.service';
import { Direction } from '@angular/cdk/bidi';

import {AuthService} from '../../core/service/auth.service'

import {TeacherService} from '../teacher.service'




import{StudentinfoforteacherComponent} from '../studentinfoforteacher/studentinfoforteacher.component'
import { SendEmailComponent } from 'app/send-email/send-email.component';


export interface DialogData {
  CourseId: number;
  action: string;
  course: Courses;
  firstName: string;
  lastName: string;
  gender: string;
}

export class Courses {
  CourseId!: number;
  courseName!: string;
  length: string | undefined;
  price: number | undefined;
  teacher: string | undefined;
  startDate: Date | undefined;
  enrolledStudents: Students[] | undefined;
  courseDetails!: string;

  constructor(init?: Partial<Courses>) {
    Object.assign(this, init);
  }
}


@Component({
  selector: 'app-teachercourseinfo',
  templateUrl: './teachercourseinfo.component.html',
  styleUrls: ['./teachercourseinfo.component.scss']
})



export class TeachercourseinfoComponent implements OnInit {

  displayedColumns: string[] = [
    'StudentNumber',
    'firstName',
    'add/remove',

  ];






  breadscrums12 = [
    {
      title: 'About Course',
      items: ['Course'],
      active: 'About Course',
    },
  ];





  panelOpenState = false;
  step = 0;
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }





//search teacher variables
  searchTeacher!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredData: any[]=[];

  FileCountOfCourse=0;
  userId!:number;


  id?: number;

  action: string;
  dialogTitle: string;
  course: Courses;

  enrolledStudents: Students[] = [];
  enrolledTeachers: Teachers[] = [];

  dataSource!: MatTableDataSource<Students>;
  dataSource2!: MatTableDataSource<Students>;

  dataSource3!: MatTableDataSource<Teachers>;
  dataSource4!: MatTableDataSource<Teachers>;

  studentsNumberOfCourse=this.courseStudentsNumber



  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    public dialogRef: MatDialogRef<TeachercourseinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private snackBar: MatSnackBar,
    private authService:AuthService,
    private teacherService:TeacherService,

    public dialog: MatDialog,




  ) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.course.courseName;
      this.course = data.course;
    } else {
      this.dialogTitle = 'New Teachers';
      const blankObject = {} as Courses;
      this.course = new Courses(blankObject);
    }
  }

  async ngOnInit(): Promise<void> {



    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);
    this.userId= this.authService.currentUserValue.id;

    try {


  console.log('control1')
      // Kursa kayıtlı öğrencileri almak için yeni fonksiyonu çağır
      this.enrolledStudents = await this.coursesServiceService.getEnrolledStudents(this.course.CourseId);

      this.enrolledTeachers = await this.coursesServiceService.getAssignedTeachers(this.course.CourseId);
      console.log('Enrolled Students12 :', this.enrolledStudents);
    } catch (error) {
      console.error('Error 12:', error);
    }



    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);
    this.dataSource4 = new MatTableDataSource<Teachers>(this.enrolledTeachers);




    this.panelOpenState = false;
    //this.filteredData = this.allTeachers;

    this.getFileCountOfCourse();


  }







  async studentDetails(row: Students) {

    this.id = row.studentId;

    console.log('detaydan gelen' + row.studentId)

   await this.studentsService.getStudentUsersByStudentId(row.studentId);

       let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dialogRef = this.dialog.open(StudentinfoforteacherComponent, {
      data: {
        student: row,
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
    //         this.studentsService.getDialogData();
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

















  enrollStudent(courseId: number, studentId: number) {
    const alreadyEnrolled = this.enrolledStudents.find(student => student.studentId === studentId);
    if (alreadyEnrolled) {
      console.log('Student already enrolled in the course');
      this.showTitleErorIcon(studentId)
    } else {
      this.coursesServiceService.enrollStudent(courseId, studentId)
        .subscribe(
          () => {
            // Kayıt işlemi başarılı olduğunda yapılacak işlemler
            console.log('Student enrolled successfully');
            // Gerekli işlemleri gerçekleştirin, öğrencinin kursa kaydedildiğini gösterin veya diğer işlemleri yapın.
            //this.enrolledSuccessfully(studentId)


          },
          (error: HttpErrorResponse) => {
            // Hata durumunda yapılacak işlemler
            console.error('Enrollment error:', error);
            // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
          }
        );
    }
    this.ngOnInit()
  }





  alreadyEnrolled(x: number) {
    Swal.fire(`Student already enrolled in the course, Student number: ${x}'`, 'Click OK to add new one');
  }

  showTitleErorIcon(x: number) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Student already enrolled in the course, Student number: ${x}`,
      //footer: '<a href>Why do I have this issue?</a>',
    });
  }





  enrolledSuccessfully(x: number) {
    Swal.fire(`Student enrolled successfully, Student number: ${x}'`, 'Click OK to add new one');
  }




  removeStudentFromCourse(courseId: number, studentId: number): void {
    this.coursesServiceService.removeStudent(courseId, studentId)
      .subscribe(
        () => {
          // Öğrenci başarıyla kaldırıldığında yapılacak işlemler
          this.snackBar.open('Student removed from course', 'Close', {
            duration: 2000
          });
          this.refreshEnrolledStudentList(studentId);
        },
        (error: HttpErrorResponse) => {
          // Hata durumunda yapılacak işlemler
          console.error('Removal error:', error);
          // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
        }
      );
  }


  refreshEnrolledStudentList(studentId: number): void {
    this.enrolledStudents = this.enrolledStudents.filter(student => student.studentId !== studentId);
    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    this.courseStudentsNumber(this.dataSource2.data)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  courseStudentsNumber(_dataSource2:any[]): number {
    return this.dataSource2.data.length;
  }


//TEACHERS


  assignTeacher(courseId: number, teacherId: number) {
    const alreadyEnrolled = this.enrolledTeachers.find(teacher => teacher.TeacherId === teacherId);
    if (alreadyEnrolled) {
      console.log('Student already enrolled in the course');
      this.showTitleErorIcon(teacherId)
    } else {
      this.coursesServiceService.addAssignedTeacher(courseId, teacherId)
        .subscribe(
          () => {
            // Kayıt işlemi başarılı olduğunda yapılacak işlemler
            this.snackBar.open('Teacher added to course', 'Close', {
              duration: 2000
            });

            this.refreshAssineedTeacherList(teacherId);

          },
          (error: HttpErrorResponse) => {
            // Hata durumunda yapılacak işlemler
            console.error('Enrollment error:', error);
            // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
          }
        );
    }
    this.ngOnInit()

  }

  removeTeacherFromCourse(courseId: number, teacherId: number): void {
    this.coursesServiceService.removeTeacher(courseId, teacherId)
      .subscribe(
        () => {
          // Öğrenci başarıyla kaldırıldığında yapılacak işlemler
          this.snackBar.open('Student removed from course', 'Close', {
            duration: 2000
          });
          this.refreshAssineedTeacherList(teacherId);
        },
        (error: HttpErrorResponse) => {
          // Hata durumunda yapılacak işlemler
          console.error('Removal error:', error);
          // Hata durumunda gerekli işlemleri yapabilir veya kullanıcıya hata mesajı gösterebilirsiniz.
        }
      );
  }

  refreshAssineedTeacherList(teacherId: number): void {
    this.enrolledTeachers = this.enrolledTeachers.filter(teacher => teacher.TeacherId !== teacherId);
   // this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    //this.courseStudentsNumber(this.dataSource2.data)
  }




onPageChange(event: PageEvent) {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.dataSource3.data = this.filteredData.slice(startIndex, endIndex);
}







getFileCountOfCourse(): void {
  this.teacherService.getFileCountOfCourse(this.course.CourseId).subscribe(
    (data: any[]) => {
      this.FileCountOfCourse = data[0].FileCount;
    },
    (error) => {
      console.error('Error fetching emails:', error);
    }
  );
}









sendEmail(email:string){this.authService.sendEmail(email);}






}
