

import { Component, OnInit } from '@angular/core';
import {EmailserviceService} from '../emailservice.service'

import {AuthService} from '../../core/service/auth.service'






@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.scss']
})


export class SentComponent implements OnInit {

  senderId!:number;



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



this.senderId= this.authService.currentUserValue.id


    this.getEmailsByReceiverId();
  }

  readEmail(email:any){

this.emailserviceService.email=email;
this.emailserviceService.readEmail(email)

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
    this.emailserviceService.getEmailsBysenderId(this.senderId).subscribe(
      (data: any[]) => {
        this.emails = data;

        console.log(this.emails);
        console.log(this.senderId)
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }







  deleteSentEmail(InboxId:number) {
    this.emailserviceService.deleteSentEmail(InboxId).subscribe(
      (response) => {
        console.log(response); // E-posta işaretlendi mesajını göster
        response.IsDeleted = true; // E-posta nesnesinde IsRead alanını true olarak işaretle
        this.getEmailsByReceiverId();
      },
      (error) => {
        console.error('E-posta okunmuş olarak işaretlenirken bir hata oluştu:', error);
        // Hata durumunda bir hata mesajı gösterebilirsiniz.
      }
    );
  }






}
