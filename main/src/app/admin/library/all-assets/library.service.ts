import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpClient,  } from '@angular/common/http';


import {environment} from '../../../../environments/environment'


@Injectable()
export class LibraryService {


  private API_URL = `${environment.apiUrl}/activitylogs`;



  constructor(private httpClient: HttpClient) {

  }





  getLogs(): Observable<any> {


    return this.httpClient.get<any>(this.API_URL);

  }





}
