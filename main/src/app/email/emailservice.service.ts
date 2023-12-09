import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class EmailserviceService {
  private apiUrl = `${environment.apiUrl}/email`;

  private emailAddressSubject = new BehaviorSubject<string>('');



   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   email: any = null;

   replyEmail: any =null;

   emailAddress='';

  constructor(private httpClient: HttpClient, private router:Router) {
    const storedEmail = localStorage.getItem('email');
    this.email = storedEmail ? JSON.parse(storedEmail) : null;


   }


   // eslint-disable-next-line @angular-eslint/contextual-lifecycle



   setEmailAddress(emailAddress: string) {
    this.emailAddressSubject.next(emailAddress);
  }


  getEmailAddress(): Observable<string> {
    return this.emailAddressSubject.asObservable();
  }




  getEmails(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}`);
  }




  getEmailsByReceiverId(receiverId: number): Observable<any[]> {
    const url = `${this.apiUrl}/inbox/${receiverId}`;
    return this.httpClient.get<any[]>(url);
  }



  getEmailsBysenderId(senderId: number): Observable<any[]> {
    const url = `${this.apiUrl}/sent/${senderId}`;
    return this.httpClient.get<any[]>(url);
  }





  sendEmail(emailData: any): Observable<any> {
    // E-posta gönderme işlemleri için Node.js API'sine POST isteği yapabiliriz
    return this.httpClient.post<any>(`${this.apiUrl}/insert`, emailData);
  }





  readEmail(email: any) {
    this.email = email;
    // Email nesnesini local storage'a kaydet
    localStorage.setItem('email', JSON.stringify(email));
    //this.router.navigateByUrl('/email/compose');
  }







  markEmailAsRead(inboxId: number): Observable<any> {
    const url = this.apiUrl + '/mark-as-read/' + inboxId;
    console.log('email sevice', inboxId)
    return this.httpClient.put(url, {});
  }



  deleteEmail(InboxId: number): Observable<any> {
    const url = this.apiUrl + '/deleteEmail/' + InboxId;
    console.log('email service', InboxId)
    return this.httpClient.put(url, {});
  }




  deleteSentEmail(InboxId: number): Observable<any> {
    const url = this.apiUrl + '/deletesentemail/' + InboxId;
    console.log('email service', InboxId)
    return this.httpClient.put(url, {});
  }




  deleteEmailCompletely(inboxId: number): Observable<any> {
    const url = this.apiUrl + '/deleteemailcompletely/' + inboxId;
    console.log('email service', inboxId)
    return this.httpClient.delete(url);
  }




}
