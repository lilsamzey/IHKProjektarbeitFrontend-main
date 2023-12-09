import { Component, ElementRef, ChangeDetectorRef,  OnInit, ViewChild, Inject,  } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {EmailserviceService} from '../email/emailservice.service'

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {AuthService} from '../core/service/auth.service'
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';






export interface DialogData {
  email:string;
}



@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit  {




  @ViewChild('subjectInput', { static: true }) subjectInput!: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public Editor: any = ClassicEditor;

  email: any = {};



  public editorContent = 'Hello, ';
  emailSubject = '';
  ReceiverUserName='';
  messageForUser='';
  senderId!:number;


  breadscrums = [
    {
      title: 'Send',
      items: ['Email'],
      active: 'New',
    },
  ];
  constructor(

    public dialogRef: MatDialogRef<SendEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private emailserviceService: EmailserviceService,
    private authService:AuthService,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
    //public dialogRef: MatDialogRef<StudentdetailsComponent>,

    ) {

  }


 ngOnInit(){




  //Dont touch. you cant send email
 this.senderId=this.authService.currentUserValue.id




 if (!this.emailserviceService.replyEmail) {
  this.ReceiverUserName = '';
} else {
  this.email=this.emailserviceService.replyEmail;
  this.ReceiverUserName = this.data.email;
  this.emailSubject=`Re: ${this.email.Subject}`;
  this.editorContent=` <br><br><br><br> Re: ${this.email.Message}`;
}

console.log(this.ReceiverUserName);




this.ReceiverUserName=this.data.email;

console.log(this.data.email);


 //this.email = this.emailserviceService.email;


}






onEditorChange(event: any) {
  this.editorContent = event.editor.getData(); // CKEditor içeriğini değişkene atama
}





  sendEmail() {
    const characterCount = this.editorContent.length; // Mesajdaki karakter sayısını hesapla

    if (characterCount > 12000) {
      // Angular kullanıcısına mesaj ver
      console.log("Mesaj 12000 karakteri aşmaktadır.");
      this.messageForUser='The message cannot exceed 12000 characters. Edit your message again.'
      Swal.fire(this.messageForUser);

      return;
    }

    const characterCountofemailSubject = this.emailSubject.length;

    if (characterCountofemailSubject > 100) {
      // Angular kullanıcısına mesaj ver
      console.log("Mesaj 12000 karakteri aşmaktadır.");
      this.messageForUser='The Subject cannot exceed 20 characters. Edit your Subject again.'
      Swal.fire(this.messageForUser);

      return;
    }

    const emailData = {

      senderId:this.senderId,
      ReceiverUserName: this.ReceiverUserName,
      emailSubject: this.emailSubject,
      editorContent:this.editorContent,

    };

    console.log(emailData)


      this.emailserviceService.sendEmail(emailData)
        .subscribe(
          response => {
            console.log('E-posta gönderildi:', response);
            this.ReceiverUserName='';
            this.emailSubject='';
            this.editorContent='';

          this.showSuccess();
          this.dialogRef.close();
          },
          error => {
            console.error('E-posta gönderme hatası:', error);
            this.showEror();
          }
        );
    }



showSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your email has been sent',
      showConfirmButton: false,
      timer: 1500,
    });
  }


  showEror() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There is no any user with this email addres, Enter a valid email address!',
      //footer: '<a href>Why do I have this issue?</a>',
    });
  }



  discard(){
    this.dialogRef.close();
  }


}
