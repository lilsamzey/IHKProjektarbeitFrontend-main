import { Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UntypedFormControl } from '@angular/forms';



import {ChatService} from '../courschat/chat.service'

import{AuthService} from '../../core/service/auth.service'
import Swal from 'sweetalert2';








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
  selector: 'app-courschat',
  templateUrl: './courschat.component.html',
  styleUrls: ['./courschat.component.scss']
})
export class CourschatComponent implements OnInit  {


  @Input() courseId!: number;






  hideRequiredControl = new UntypedFormControl(false);
  messages: Message[] = [];
  users: User[] = [];
  senderId!:number; // Gönderen kullanıcının kimliği
  senderName!:string;

  messageContent = '';

  messageForUser=''


showButton=false;


  editingMessageId: number | null = null;
  updatedMessageContent = '';




  constructor(private chatService:ChatService, private authService:AuthService) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {

    this.senderId=this.authService.currentUserValue.id
    this.senderName=this.authService.currentUserValue.firstName

    console.log('message from chatcomp.ts', this.courseId)
    //this.fetchUsers();
    //this.fetchMessages();
    this.fetchMessagesOfCourses(this.courseId)


  }




  fetchMessagesOfCourses(courseId:number) {
    this.chatService.getMessagesOfCourses(courseId).subscribe(
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
    this.chatService.getMessagesOfCourses(this.courseId).subscribe(
      (response) => {
        this.messages = response;

      },
      (error) => {
        console.error('Hata:', error);
      }
    );
  }







  sendMessage() {
    const characterCount = this.messageContent.length; // Mesajdaki karakter sayısını hesapla

    if (characterCount > 12000) {
      // Angular kullanıcısına mesaj ver
      console.log("Mesaj 12000 karakteri aşmaktadır.");
      this.messageForUser='The message cannot exceed 12000 characters. Edit your message again.'
      Swal.fire(this.messageForUser);

      return;
    }

    const newMessage = {
      senderId: this.senderId,
      courseId: this.courseId,
      messageContent: this.messageContent
    };

    this.chatService.sendMessage(newMessage).subscribe(
      response => {
        this.messageContent = '';
        this.refreshChat();
      },
      error => {
        console.error(error);
      }
    );
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
      this.chatService.deleteMessageByUserId(messageId).subscribe(
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


      this.chatService.updateMessageByMessageId(updatedMessage).subscribe(
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
