
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

import {StudentService} from '../student.service'

import{AuthService} from '../../core/service/auth.service'

import { HttpClient } from '@angular/common/http';
import { Direction } from '@angular/cdk/bidi';
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
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.scss']
})



export class CourseinfoComponent implements OnInit {

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


studentAttendance: any[]=[];



FileCountOfCourse=0;

  action: string;
  dialogTitle: string;
  course: Courses;

  enrolledStudents: Students[] = [];
  enrolledTeachers: Teachers[] = [];

  dataSource!: MatTableDataSource<Students>;
  dataSource2!: MatTableDataSource<Students>;

  dataSource3!: MatTableDataSource<Teachers>;
  dataSource4!: MatTableDataSource<Teachers>;

  studentsNumberOfCourse=this.courseStudentsNumber;

  currentStudentId!:number;
  studentCourseAttendance:any[]=[];

  currentStudentName!:string;







  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    public dialogRef: MatDialogRef<CourseinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private snackBar: MatSnackBar,
    private studentService:StudentService,
    private authService:AuthService,
    private httpClient: HttpClient,
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

    this.getFileCountOfCourse()

    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    this.currentStudentName=this.authService.currentUserValue.firstName

    try {



      this.enrolledStudents = await this.coursesServiceService.getEnrolledStudents(this.course.CourseId);

      this.enrolledTeachers = await this.coursesServiceService.getAssignedTeachers(this.course.CourseId);
      console.log('Enrolled Students12 :', this.enrolledStudents);
    } catch (error) {
      console.error('Error 12:', error);
    }



    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);
    this.dataSource4 = new MatTableDataSource<Teachers>(this.enrolledTeachers);



    this.getCurrentStudentId(this.authService.currentUserValue.id)


    this.panelOpenState = false;
    //this.filteredData = this.allTeachers;





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




getCurrentStudentId(userId:number){

  this.studentService.getCurrentStudentId(userId).subscribe(
  (studentId: any) => {
    this.currentStudentId = studentId[0].studentId;

    this.getAttendanceByCourseIdAndStudentId()

    // Diğer işlemleri burada gerçekleştirin
  },
  (error) => {
    console.error('Hata:', error);
  }
);}



getAttendanceByCourseIdAndStudentId(){

  this.studentService.getAttendanceByCourseIdAndStudentId(this.course.CourseId, this.currentStudentId).subscribe(
  (attendance: any) => {
    this.studentCourseAttendance = attendance;

      console.log(this.studentCourseAttendance)
    // Diğer işlemleri burada gerçekleştirin
  },
  (error) => {
    console.error('Hata:', error);
  }
);}






calculateAttendancePercentage(): number {
  const totalAttendances = this.studentCourseAttendance.filter(a => a.Attendance).length;
  const totalItems = this.studentCourseAttendance.length;
  const percentage = totalItems > 0 ? (totalAttendances / totalItems) * 100 : 0;
  return Math.round(percentage);
}





getFileCountOfCourse(): void {
  this.studentService.getFileCountOfCourse(this.course.CourseId).subscribe(
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
