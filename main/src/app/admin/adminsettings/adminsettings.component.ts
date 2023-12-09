
  import { Component, OnInit } from '@angular/core';
  import {SettingService} from './setting.service'
  import{AuthService} from '../../core/service/auth.service'


  import { Router } from '@angular/router';








@Component({
  selector: 'app-adminsettings',
  templateUrl: './adminsettings.component.html',
  styleUrls: ['./adminsettings.component.scss']
})
  export class AdminsettingsComponent {
    breadscrums = [
      {
        title: 'Settings',
        items: ['Admin'],
        active: 'Settings',
      },
    ];
  //Variables:

  userId!:number;
  settingsInfo:any[]=[];
  newPassword= '';















    constructor(
      private settingService:SettingService,
      private authService:AuthService,
      private router: Router

      ) {
      //constructor
    }







    ngOnInit() {
      this.userId=this.authService.currentUserValue.id;
      this.getAdminSettingsInfo()

      console.log(this.userId)



    }








    getAdminSettingsInfo(): void {
      this.settingService.getAdminSettingsInfo(this.userId).subscribe(
        (info: any) => {
          this.settingsInfo = info;
          console.log('Courses of ',this.settingsInfo);
          
        },
        (error) => {
          console.error('Hata:', error);
        }
      );}



      async savePassword(userId: number, password: string, admin: string): Promise<void> {
        try {
          await this.settingService.updateAdminsUserPassword(userId, password, admin).toPromise();





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
