

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService } from '../../admin/students/all-students/students.service';
import { Students } from '../../admin/students/all-students/students.model';

import {StudentnotesComponent} from '../../admin/students/studentnotes/studentnotes.component'






import { AuthService } from '@core';


export interface DialogData {
  student: Students;
  StudentId: number;
  name: string;
  department: string;
  mobile: string;
}



@Component({
  selector: 'app-studentinfoforteacher',
  templateUrl: './studentinfoforteacher.component.html',
  styleUrls: ['./studentinfoforteacher.component.scss']
})




export class StudentinfoforteacherComponent {

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

studentUserName:string | undefined;
studentUserPassword:string | undefined;
  studentNotes: any[]=[]
// user:string | undefined;
// userName:string | undefined;







  constructor(
    public dialogRef: MatDialogRef<StudentinfoforteacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private authService: AuthService,



  ) {


  }




  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  async ngOnInit(): Promise<void>{


    this.userName =this.authService.currentUserValue.username;

console.log(this.userName)

    this.userPassword =this.authService.currentUserValue.password;
    this.userId=this.authService.currentUserValue.id

    this.studentUserName=this.studentsService.studentUserName1;
    this.studentUserPassword=this.studentsService.studentUserPassword;





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









  sendEmail(email:string){this.authService.sendEmail(email);}






}
