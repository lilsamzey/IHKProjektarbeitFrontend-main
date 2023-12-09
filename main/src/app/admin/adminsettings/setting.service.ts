
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError} from 'rxjs';
import { environment } from 'environments/environment';



import {AuthService} from '../../core/service/auth.service'
import Swal from 'sweetalert2';


import { tap } from 'rxjs/operators';







@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private API_URL = `${environment.apiUrl}`; // API URL'si

  private coursesAPI = `${environment.apiUrl}`; // API URL'si

  constructor(private httpClient: HttpClient, private authService:AuthService) {}







  getAdminSettingsInfo(userId: any): Observable<any> {
    const url = `${this.API_URL}/admins/adminsettings/${userId}`;

    return this.httpClient.get<any>(url);
  }








  getAdminInfoByAdminId(adminId: any): Observable<any> {
    const url = `${this.API_URL}/admins/admindetails/${adminId}`;

    return this.httpClient.get<any>(url);
  }




  updateAdminsUserPassword(userId: number, password: string, teacher: string): Observable<void> {
    const data = { password: password };
    console.log(userId, password);

    return this.httpClient.put<void>(`${this.API_URL}/admins/adminsettings/${userId}`, data)
      .pipe(
        tap(() => {
          this.showSuccess()

          //activity log
          this.authService.addActivityLog(
            this.authService.currentUserValue.id,
            'Student Password Updating',
            `Student ${teacher} updated his/her password. Students' userId=${userId}, New Password=${password}`);
        })
      );
  }





  showSuccess() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your password has been updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }


}
