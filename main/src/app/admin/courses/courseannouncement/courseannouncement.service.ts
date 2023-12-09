import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseannouncementService {

  private  apiUrl = `${environment.apiUrl}/chat/messages`;
  //private apiUrl = 'https://ednonodejs.azurewebsites.net/chat/messages';

  constructor(private httpClient: HttpClient) {}

  getMessages(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.apiUrl);
  }



  getMessagesOfCourses(courseId:number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/courses/${courseId}`);
  }




  sendMessage(newMessage: any): Observable<any> {

    console.log(newMessage)

    return this.httpClient.post(`${this.apiUrl}/courses/${newMessage.courseId}`, newMessage);
  }



  deleteMessageByUserId(messageId: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${messageId}`);
  }



  updateMessageByMessageId(updatedMessage: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${updatedMessage.messageId}`, updatedMessage);
  }








}
