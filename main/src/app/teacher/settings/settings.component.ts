import { Component, OnInit } from '@angular/core';
import {TeacherService} from '../teacher.service';
import{AuthService} from '../../core/service/auth.service'


import { Router } from '@angular/router';










@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  breadscrums = [
    {
      title: 'Settings',
      items: ['Teacher'],
      active: 'Settings',
    },
  ];
//Variables:

userId!:number;
settingsInfo:any[]=[];
newPassword= '';















  constructor(
    private teacherService:TeacherService,
    private authService:AuthService,
    private router: Router

    ) {
    //constructor
  }







  ngOnInit() {
    this.userId=this.authService.currentUserValue.id;
    this.getTeacherSettingsInfo()



  }








  getTeacherSettingsInfo(): void {
    this.teacherService.getTeacherSettingsInfo(this.userId).subscribe(
      (info: any) => {
        this.settingsInfo = info;
        console.log('Courses of ',this.settingsInfo);
        // Diğer işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error('Hata:', error);
      }
    );}



    async savePassword(userId: number, password: string, student: string): Promise<void> {
      try {
        await this.teacherService.updateTeachersUserPassword(userId, password, student).toPromise();





     const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });



      } catch (error) {
        console.error('Error updating password:', error);
      }
    }



  isNewPasswordValid(): boolean {
        return !!this.newPassword && this.newPassword.length >= 6 && /^\S+$/.test(this.newPassword);
  }











}
