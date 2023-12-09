import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../../core/service/auth.service'
import {EmailserviceService} from '../emailservice.service'

import {ComposeComponent} from '../compose/compose.component'


@Component({
  selector: 'app-read-mail',
  templateUrl: './read-mail.component.html',
  styleUrls: ['./read-mail.component.scss'],
})
export class ReadMailComponent implements OnInit{
  breadscrums = [
    {
      title: 'Read',
      items: ['Email'],
      active: 'Read',
    },
  ];

  email:any;
  currentUserName!:string;


  constructor(
    private router: Router,
    private emailserviceService:EmailserviceService,
    private composeComponent:ComposeComponent,
    private authService:AuthService

  ) {
    //constructor
  }



ngOnInit(){



  this.email=this.emailserviceService.email;


  this.currentUserName= this.authService.currentUserValue.username



}





replyToEmail(email:any){

  this.emailserviceService.replyEmail = email; // E-posta verisini hizmet üzerinden aktar
    this.router.navigate(['/email/compose']);


  console.log(this.emailserviceService.replyEmail);


}






}
