import { Component, OnInit } from '@angular/core';
import {EmailserviceService} from '../emailservice.service'

import {AuthService} from '../../core/service/auth.service'

@Component({
  selector: 'app-mailside',
  templateUrl: './mailside.component.html',
  styleUrls: ['./mailside.component.scss']
})
export class MailsideComponent implements OnInit{

  receiverId!:number;



  emails: any[] = [];

  unReadEmails!:number;

  constructor(
    private emailserviceService: EmailserviceService,
    private authService:AuthService,


    ) { }








  ngOnInit(): void {



this.receiverId= this.authService.currentUserValue.id


    this.getEmailsByReceiverId();




  }




  getEmailsByReceiverId() {
    this.emailserviceService.getEmailsByReceiverId(this.receiverId).subscribe(
      (data: any[]) => {
        this.emails = data;
        this.unReadEmails = this.getUnreadEmailsCount(this.emails)

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  getUnreadEmailsCount(emails: any[]): number {
    return emails.filter(email => !email.IsReadByReceiver).length;
  }


}
