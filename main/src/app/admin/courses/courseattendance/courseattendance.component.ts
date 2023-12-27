import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { CoursesServiceService } from '../courses-service.service';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from '../../students/all-students/students.service';
import { Students } from '../../students/all-students/students.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Teachers } from 'app/admin/teachers/all-teachers/teachers.model';
import { TeachersService } from 'app/admin/teachers/all-teachers/teachers.service';
import { Direction } from '@angular/cdk/bidi';
import { ThemePalette } from '@angular/material/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';




//import{StudentinfoforteacherComponent} from '../studentinfoforteacher/studentinfoforteacher.component'


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
  selector: 'app-courseattendance',
  templateUrl: './courseattendance.component.html',
  styleUrls: ['./courseattendance.component.scss']
})


export class CourseattendanceComponent implements OnInit {

  @Input() courseId!: number;
  @Input() userId!: number;



  //attendanceData:any[]=[];


  studentAttandence={

    'StudentId': 0,
    'Date': '',
    'Attandence': 0,
    'CourseId': 0,
    'UserId': 0,
    'Explaining': '',

  }






  explanation!:string;


  attendance=1;

  courseAttandence?: UntypedFormGroup;
  hide2 = true;





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
  selectedDateValue!: string | number | Date;
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


  courseAttendanceInfo:any[]=[]


  attendanceDetailsByDate:any[]=[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filteredData: any[]=[];


  id?: number;

  action: string;
  dialogTitle: string;
  course: Courses;

  enrolledStudents: Students[] = [];
  enrolledTeachers: Teachers[] = [];

  dataSource!: MatTableDataSource<Students>;
  dataSource2!: MatTableDataSource<any>;

  dataSource3!: MatTableDataSource<Teachers>;
  dataSource4!: MatTableDataSource<Teachers>;

  studentsNumberOfCourse=this.courseStudentsNumber




  isChecked: boolean[] = [];
  explanationList: string[] = [];
  isDateSelected!: boolean ;
  selectedDate!: string;











  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(
    public dialogRef: MatDialogRef<CourseattendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public coursesServiceService: CoursesServiceService,
    private studentsService: StudentsService,
    private teachersService: TeachersService,
    private snackBar: MatSnackBar,

    public dialog: MatDialog,
    private fb: UntypedFormBuilder



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

    this.dataSource2.data.forEach(() => {
      this.isChecked.push(false);
    });



    this.isDateSelected=false;

    console.log(this.userId)

    try {



      // Kursa kayıtlı öğrencileri almak için yeni fonksiyonu çağır
      this.enrolledStudents = await this.coursesServiceService.getEnrolledStudents(this.course.CourseId);

      this.enrolledTeachers = await this.coursesServiceService.getAssignedTeachers(this.course.CourseId);
      console.log('Enrolled Students12 :', this.enrolledStudents);
    } catch (error) {
      console.error('Error 12:', error);
    }



    this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);
    this.dataSource4 = new MatTableDataSource<Teachers>(this.enrolledTeachers);


this.getCoursesAttendaceInfo();

    this.panelOpenState = false;
    //this.filteredData = this.allTeachers;


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
    const dialogRef = this.dialog.open(CourseattendanceComponent, {
      data: {
        student: row,
        action: 'edit',
      },
      direction: tempDirection,
    });

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
    const alreadyEnrolled = this.enrolledTeachers.find(teacher => teacher.teacherId === teacherId);
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
    this.enrolledTeachers = this.enrolledTeachers.filter(teacher => teacher.teacherId !== teacherId);
   // this.dataSource2 = new MatTableDataSource<Students>(this.enrolledStudents);

    //this.courseStudentsNumber(this.dataSource2.data)
  }




onPageChange(event: PageEvent) {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.dataSource3.data = this.filteredData.slice(startIndex, endIndex);
}






saveAttendance() {
  const attendanceData: any[] = [];
  this.dataSource2.data.forEach((student, index) => {
    const attendance = this.isChecked[index] ? 1 : 0;
    const allexplanation = this.explanationList[index];
    const explanation = allexplanation ? allexplanation : null; // Eğer explanation boş ise null olarak ayarla
    const attendanceRecord = {
      StudentId: student.StudentId,
      Date: this.selectedDate,
      Attendance: attendance,
      CourseId: this.courseId,
      UserId: this.userId,
      Explanation: explanation
    };
    attendanceData.push(attendanceRecord);
  });

  console.log(attendanceData);
  this.dialogRef.close();


  this.coursesServiceService.saveStudentAttendance(this.courseId, attendanceData)
  .subscribe(
    () => {
      console.log('success.');
      // Başarılı kaydetme durumunda gerçekleştirilecek işlemleri burada yapabilirsiniz
    },
    (error) => {
      console.error('error:', error);
      // Hata durumunda gerçekleştirilecek işlemleri burada yapabilirsiniz
    }
  );

  // attendanceData'ı kaydetmek için gerekli işlemleri yapın
}







checkDateValidity() {
  this.isDateSelected = true;
  const selectedDate = new Date(this.selectedDate);
selectedDate.setDate(selectedDate.getDate() + 1);
this.selectedDate = selectedDate.toISOString().substring(0, 10);
}













getCoursesAttendaceInfo() {

  this.coursesServiceService.getCoursesAttendaceInfo(this.course.CourseId)
  .subscribe(
    (result:any) => {
      console.log(result);

      this.courseAttendanceInfo=result;

    },
    (error) => {
      console.error('error:', error);
      // Hata durumunda gerçekleştirilecek işlemleri burada yapabilirsiniz
    }
  );


      }




      getAttendanceDetailsByDate(date:string){
        console.log('hallo welt')
        this.coursesServiceService.getAttendanceDetailsByDate(this.course.CourseId, date)
        .subscribe(
          (result:any) => {
            console.log(result);

            this.attendanceDetailsByDate=result;

          },
          (error) => {
            console.error('error:', error);
            // Hata durumunda gerçekleştirilecek işlemleri burada yapabilirsiniz
          }
        );

      }





}











