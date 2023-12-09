import { Component, OnInit } from '@angular/core';
import {EmailserviceService} from '../emailservice.service'

import {AuthService} from '../../core/service/auth.service'

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrls: ['./bin.component.scss']
})
export class BinComponent implements  OnInit {

  receiverId!:number;



  emails: any[] = [];

  constructor(
    private emailserviceService: EmailserviceService,
    private authService:AuthService,



    ) { }


  breadscrums = [
    {
      title: 'Inbox',
      items: ['Email'],
      active: 'Inbox',
    },
  ];



  ngOnInit(): void {
    //this.getEmails();



this.receiverId= this.authService.currentUserValue.id


    this.getEmailsByReceiverId();
  }

readEmail(email:any){

this.emailserviceService.email=email;
this.emailserviceService.readEmail(email)

this.markAsRead(email.InboxId)

  }


  getEmails(): void {
    this.emailserviceService.getEmails().subscribe(
      (data: any[]) => {
        this.emails = data;

        console.log(this.emails)
      },
      (error) => {
        console.error('Error fetching emails:', error);
      }
    );
  }



  getEmailsByReceiverId() {
    this.emailserviceService.getEmailsByReceiverId(this.receiverId).subscribe(
      (data: any[]) => {
        this.emails = data;

        console.log(this.emails);
        console.log(this.receiverId)

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }








  markAsRead(InboxId:number) {
    this.emailserviceService.markEmailAsRead(InboxId).subscribe(
      (response) => {
        console.log(response); // E-posta işaretlendi mesajını göster

      },
      (error) => {
        console.error('E-posta okunmuş olarak işaretlenirken bir hata oluştu:', error);
        // Hata durumunda bir hata mesajı gösterebilirsiniz.
      }
    );
  }



  deleteEmailCompletely(InboxId:number) {
    console.log('comp;letely deleted emailid 1', InboxId)
    this.emailserviceService.deleteEmailCompletely(InboxId).subscribe(
      (response) => {
        this.getEmailsByReceiverId()
      },
      (error) => {
        console.error('E-posta okunmuş olarak işaretlenirken bir hata oluştu:', error);
        // Hata durumunda bir hata mesajı gösterebilirsiniz.
      }
    );

  }



}
