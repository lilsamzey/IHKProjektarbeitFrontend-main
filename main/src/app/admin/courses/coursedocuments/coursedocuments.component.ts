






import { Component, Input, OnInit  } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-coursedocuments',
  templateUrl: './coursedocuments.component.html',
  styleUrls: ['./coursedocuments.component.scss']
})
export class CoursedocumentsComponent {


  @Input() courseId!: any;

  private  API_URL = `${environment.apiUrl}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  files: any[] = [];

  constructor(private httpClient: HttpClient) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.fetchFiles();
  }

  fetchFiles() {
    this.httpClient.get<any[]>(`${this.API_URL}/files/files`).subscribe(
      (response) => {
        this.files = response;
      },
      (error) => {
        console.error('Dosyalar alınırken hata oluştu:', error);
      }
    );
  }

  downloadFile(file: any) {
    const downloadUrl = `${this.API_URL}/files/` + file.id + '/download';
    window.open(downloadUrl, '_blank');
  }



  handleFileInput(event: any) {
    const files = event.target.files;
    // Dosya işleme işlemleri burada gerçekleştirilebilir
    console.log(files);
  }


  onFileUploaded() {
    // Dosya yüklendikten sonra tabloyu güncelle
    this.fetchFiles();
  }







}


