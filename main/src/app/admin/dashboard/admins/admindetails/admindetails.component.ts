

import { Component, Inject, OnInit } from '@angular/core';
import {AdminserviceService} from '../adminservice.service'


import {SettingService} from '../../../adminsettings/setting.service'

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { Direction } from '@angular/cdk/bidi';
import { SendEmailComponent } from 'app/send-email/send-email.component';










export interface DialogData {
  adminId: number;
  action: string;
  admin: any;
}









@Component({
  selector: 'app-admindetails',
  templateUrl: './admindetails.component.html',
  styleUrls: ['./admindetails.component.scss']
})



export class AdmindetailsComponent {
  breadscrums = [
    {
      title: 'Settings',
      items: ['Admin'],
      active: 'Details',
    },
  ];
//Variables:

userId!:number;
adminInfo:any[]=[];
newPassword= '';
adminId!:number;




admin: any;


action: string;
dialogTitle: string;



constructor(
  public dialogRef: MatDialogRef<AdmindetailsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData,
  public adminserviceService: AdminserviceService,
  private fb: UntypedFormBuilder,
  private settingService:SettingService,
  public dialog: MatDialog,
) {
  // Set the defaults
  this.action = data.action;
  if (this.action === 'edit') {
    this.dialogTitle = data.admin.firstName;
    this.admin = data.admin;
  } else {
    this.dialogTitle = 'Admins';
    // const blankObject = {} as admin;
    // this.admin = new admin(blankObject);
  }

}







  ngOnInit() {
    this.getAdminInfoByAdminId()




  }








  getAdminInfoByAdminId(): void {
    this.settingService.getAdminInfoByAdminId(this.data.admin.adminId).subscribe(
      (info: any) => {
        this.adminInfo = info;

        console.log('Courses of ',this.adminInfo);
        // Diğer işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error('Hata:', error);
      }
    );}



    async savePassword(userId: number, password: string, student: string): Promise<void> {
      try {
        await this.settingService.updateAdminsUserPassword(userId, password, student).toPromise();

        this.getAdminInfoByAdminId()
        this.newPassword= '';

      } catch (error) {
        console.error('Error updating password:', error);
      }
    }



  isNewPasswordValid(): boolean {
        return !!this.newPassword && this.newPassword.length >= 6 && /^\S+$/.test(this.newPassword);
  }








  sendEmail(email:string){


    console.log('detaydan gelen' + email)

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(SendEmailComponent, {
      data: {
        email: email,
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
