// admin/courses/coursefileupload/coursefileupload.component.ts
import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from '../../../core/service/auth.service';
import { CoursedocumentsComponent } from '../coursedocuments/coursedocuments.component';
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-coursefileupload',
  templateUrl: './coursefileupload.component.html',
  styleUrls: ['./coursefileupload.component.scss']
})
export class CoursefileuploadComponent {
  selectedFile: File | null = null;
  userId!: any;


  private  API_URL = `${environment.apiUrl}`;

  @Input() courseId!: any; // Örnek olarak kullanıcı kimlik numarasını buraya koyuyoruz. Gerçek senaryoda kullanıcının kimlik bilgilerini almanız gerekir.

  constructor(private http: HttpClient, private authService: AuthService, private coursedocumentsComponent: CoursedocumentsComponent) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    this.userId = this.authService.currentUserValue.id;
  }

  onUpload() {
    if (!this.selectedFile) {
      //console.error('File not selected!');
      this.showTitleErorIcon();
      return;
    }

    const allowedFileTypes = ['.pdf', '.jpg', '.png', '.zip'];
    const fileExtension = this.selectedFile.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedFileTypes.includes('.' + fileExtension)) {
      console.error('Invalid file type! Only .pdf, .jpg, .png, and .zip files are allowed.');
      this.showFileTypeErrorIcon();
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('fileName', this.selectedFile.name);
    formData.append('fileSize', this.selectedFile.size.toString());
    formData.append('fileType', this.selectedFile.type);
    formData.append('userId', this.userId.toString());
    formData.append('courseId', this.courseId.toString());

    console.log('file upload bilgisi');

    console.log(formData);

    this.http.post<any>(`${this.API_URL}/files/upload`, formData).subscribe(
      (response) => {
        // Dosya yükleme işlemi tamamlandığında çalışan fonksiyonu çağırın
        this.uploadSuccess(formData, response);
        console.log(formData);
        this.selectedFile = null;
        this.coursedocumentsComponent.fetchFiles();
      },
      (error) => {
        console.error('Error loading file:', error);
      }
    );
  }

  uploadSuccess(formData: FormData, response: any) {
    console.log('File uploaded:', response);
    console.log('formData:', formData); // formData'yı burada görebilirsiniz
  }

  showTitleErorIcon() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please select a file!',
      //footer: '<a href>Why do I have this issue?</a>',
    });
  }

  showFileTypeErrorIcon() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid file type! Only .pdf, .jpg, .png, and .zip files are allowed.',
    });
  }
}
