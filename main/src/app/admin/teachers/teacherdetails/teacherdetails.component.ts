

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { TeachersService } from '../all-teachers/teachers.service';
import { Teachers } from '../all-teachers/teachers.model';



import { AuthService } from '@core';

export interface DialogData {
  teacher: Teachers;
  TeacherId: number;
  name: string;
  department: string;
  mobile: string;
}



@Component({
  selector: 'app-teacherdetails',
  templateUrl: './teacherdetails.component.html',
  styleUrls: ['./teacherdetails.component.scss']
})




export class TeacherdetailsComponent {

  breadscrums = [
    {
      title: 'Profile',
      items: ['Teacher'],
      active: 'Profile',
    },
  ];



userName:string | undefined;
userPassword:string | undefined;

teacherUserName:string | undefined;
teacherUserPassword:string | undefined;
// user:string | undefined;
// userName:string | undefined;





  constructor(
    public dialogRef: MatDialogRef<TeacherdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public teachersService: TeachersService,
    private authService: AuthService
  ) {


  }




  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit():void{
   console.log(this.data.teacher.TeacherId);

   //this.studentsService.getStudentUsersByStudentId(this.data.student.StudentId)

    this.userName =this.authService.currentUserValue.username;
    this.userPassword =this.authService.currentUserValue.password;

    //this.studentUserName=this.studentsService.studentUserName1;
    //this.studentUserPassword=this.studentsService.studentUserPassword;

    console.log('oasdakj', this.teacherUserName)




  }






}
