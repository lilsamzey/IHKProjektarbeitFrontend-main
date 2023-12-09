
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef,  } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../all-students/students.service';
import { Students } from '../all-students/students.model';

import {DeleteAttendanceComponent} from'../delete-attendance/delete-attendance.component'



import {SettingService} from '../../adminsettings/setting.service'



import { AuthService } from '@core';
import Swal from 'sweetalert2';
import { Direction } from '@angular/cdk/bidi';
import { SendEmailComponent } from 'app/send-email/send-email.component';


export interface DialogData {
  student: Students;
  StudentId: number;
  name: string;
  department: string;
  mobile: string;
}








@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})




export class StudentdetailsComponent {

  breadscrums = [
    {
      title: 'Profile',
      items: ['Student'],
      active: 'Profile',
    },
  ];


userId!:number;
userName:string | undefined;
userPassword:string | undefined;

studentIdForStudentNotes!:number;

studentUserId!:number;

newPassword!:string;

studentUserName:string | undefined;
studentUserPassword:string | undefined;

  studentNotes: any[]=[]
// user:string | undefined;
// userName:string | undefined;

courses: any[]=[];



studentCourseAttendance:any[]=[];





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



  constructor(
    public dialogRef: MatDialogRef<StudentdetailsComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private authService: AuthService,
    private settingService:SettingService,



  ) {


  }




  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit(): Promise<void>{


    this.userName =this.authService.currentUserValue.username;
    this.userPassword =this.authService.currentUserValue.password;
    this.userId=this.authService.currentUserValue.id

    

    this.studentUserName=this.studentsService.studentUserName1;
    this.studentUserPassword=this.studentsService.studentUserPassword;
    this.studentUserId=this.studentsService.studentUserId;

    console.log(this.studentUserPassword)
    this.getAllCoursesByStudentId();



if(this.studentsService.studentNotesofStudentService.length === 0){

  this.studentNotes=[{
    "NoteId": '',
    "StudentId": '',
    "NoteType": '',
    "NoteText": '',
    "DateAdded": '',
    "AuthorID": ''
    }

  ]

}else {this.studentNotes= this.studentsService.studentNotesofStudentService;}


  }







  saveChanges(StudentId: number, students: Students): void {

  this.studentsService.updateStudents(StudentId, students)

  this.showCustomPosition()

  }

  showCustomPosition() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Changes have been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  }




  getAllCoursesByStudentId(): void {
    this.studentsService.getAllCoursesByStudentId(this.data.student.studentId).subscribe(
      (courses: any) => {
        this.courses = courses;
        console.log('Courses of ',this.data.student.studentId);
        // Diğer işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error('Hata:', error);
      }
    );}








getAttendanceByCourseIdAndStudentId(courseId:number){

  this.studentsService.getAttendanceByCourseIdAndStudentId(courseId, this.data.student.studentId).subscribe(
  (attendance: any) => {
    this.studentCourseAttendance = attendance;


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


deleteAttendance(attandance: any[]) {


  let tempDirection: Direction;
  if (localStorage.getItem('isRtl') === 'true') {
    tempDirection = 'rtl';
  } else {
    tempDirection = 'ltr';
  }
  const dialogRef = this.dialog.open(DeleteAttendanceComponent, {
    data: attandance,
    direction: tempDirection,
  });
  // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
  //   if (result === 1) {
  //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
  //       (x) => x.StudentId === this.id
  //     );
  //     // for delete we use splice in order to remove single object from DataService
  //     if (foundIndex != null && this.exampleDatabase) {
  //       this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //       this.refreshTable();
  //       this.showNotification(
  //         'snackbar-danger',
  //         'Delete Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   }
  // });
}





sendEmail(email:string){this.authService.sendEmail(email);}







async updateStudentPassword(studentUserId: number, newPassword: string): Promise<void> {
  try {
    await this.studentsService.updateStudentUserPassword(studentUserId, newPassword,).toPromise();

    
  

  } catch (error) {
    console.error('Error updating password:', error);
  }
}



isNewPasswordValid(): boolean {
  return !!this.newPassword && this.newPassword.length >= 6 && /^\S+$/.test(this.newPassword);
}



}
