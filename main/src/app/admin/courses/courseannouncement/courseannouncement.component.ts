





import { Component, OnInit, Input, NgModule, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormControl } from '@angular/forms';




import {CourseannouncementService} from './courseannouncement.service'



import {AuthService} from '../../../core/service/auth.service'

import Swal from 'sweetalert2';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';








interface User {
  avatar: string;
  name: string;
  online: boolean;
  status: string;
}

interface Message {
  senderId: number;
  senderName: string;
  messageContent: string;
  timestamp: string;
  firstName:string;
  lastName:string;
  messageId:number;
}




@Component({
  selector: 'app-courseannouncement',
  templateUrl: './courseannouncement.component.html',
  styleUrls: ['./courseannouncement.component.scss']
})


export class CourseannouncementComponent implements OnInit  {


  @Input() courseId!: number;






  hideRequiredControl = new UntypedFormControl(false);
  messages: Message[] = [];
  users: User[] = [];
  senderId!:number; // Gönderen kullanıcının kimliği
  senderName!:string;

  messageContent = '';

  messageForUser=''

  userRole!:string;

  showButton=false;


  editingMessageId: number | null = null;
  updatedMessageContent = '';




  constructor(
    private courseannouncementService:CourseannouncementService,
    private authService:AuthService,
    private sanitizer: DomSanitizer
    ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {

    this.senderId=this.authService.currentUserValue.id
    this.senderName=this.authService.currentUserValue.firstName;
    this.userRole=this.authService.currentUserValue.role;

    console.log('message from chatcomp.ts', this.courseId)
    //this.fetchUsers();
    //this.fetchMessages();
    this.fetchMessagesOfCourses(this.courseId)


  }




  fetchMessagesOfCourses(courseId:number) {
    this.courseannouncementService.getMessagesOfCourses(courseId).subscribe(
      (response) => {
        this.messages = response;
        console.log(this.messages)
      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }




  refreshChat() {
    this.courseannouncementService.getMessagesOfCourses(this.courseId).subscribe(
      (response) => {
        this.messages = response;

      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }







  sendMessage() {
    // Eğer mesaj boşsa, kullanıcıya bir uyarı göster ve fonksiyonu sonlandır.
    if (!this.messageContent || this.messageContent.trim() === '') {
      this.messageForUser = 'Empty messages cannot be sent.';
      Swal.fire(this.messageForUser);
      return;
    }

    const characterCount = this.messageContent.length; // Mesajdaki karakter sayısını hesapla

    if (characterCount > 12000) {
      // Angular kullanıcısına mesaj ver

      this.messageForUser = 'The message cannot exceed 12000 characters. Edit your message again.';
      Swal.fire(this.messageForUser);
      return;
    }

    const newMessage = {
      senderId: this.senderId,
      courseId: this.courseId,
      messageContent: this.messageContent
    };

    this.courseannouncementService.sendMessage(newMessage).subscribe(
      response => {
        this.messageContent = '';
        this.refreshChat();
      },
      error => {
        console.error(error);
      }
    );
  }








  transformLinks(text: string): SafeHtml {
    // URL'leri dönüştürme
    const replacedText = text.replace(/(https?:\/\/[^\s]+)/g, url => `<a href="${url}" target="_blank">${url}</a>`);

    // Yeni satırları <br> ile değiştirme
    const newLineReplacedText = replacedText.replace(/\n/g, '<br>');

    // Güvenli HTML olarak işaretleme
    return this.sanitizer.bypassSecurityTrustHtml(newLineReplacedText);
  }



  // sendMessage() {

  //     const newMessage = {
  //       senderId: this.senderId,
  //       courseId: this.courseId,
  //       messageContent: this.messageContent
  //     };


  //   this.chatService.sendMessage(newMessage).subscribe(
  //     response => {
  //       this.messageContent = ''
  //       this.refreshChat()

  //     },
  //     error => {
  //       console.error(error); // Hata durumunda burada
  //     }
  //   );
  //   }



    deleteMessage(message: Message) {

      console.log(message.messageId)
      const messageId = message.messageId;
      this.courseannouncementService.deleteMessageByUserId(messageId).subscribe(
        response => {
          this.refreshChat();
        },
        error => {
          console.error(error);
        }
      );
    }



    updateMessage(message: Message) {
      this.showButton=true;
      this.messageContent=message.messageContent;
      this.editingMessageId = message.messageId;

      console.log(message.messageId)

    }


    saveUpdatedMessage() {
      const updatedMessage = {
        messageId:this.editingMessageId,
        messageContent: this.messageContent
      };


      console.log(updatedMessage.messageContent)
      // İlgili API üzerinden mesajın güncellenmesi işlemi yapılabilir


      this.courseannouncementService.updateMessageByMessageId(updatedMessage).subscribe(
        response => {
          this.refreshChat();
        },
        error => {
          console.error(error);
        }
      );

      this.editingMessageId = null;
      this.updatedMessageContent = '';

      this.messageContent = ''
        this.refreshChat()
        this.showButton=false;
    }










  }
