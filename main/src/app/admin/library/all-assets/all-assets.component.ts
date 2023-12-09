import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {LibraryService} from './library.service'





@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.scss'],
})





export class AllAssetsComponent {
  breadscrums = [
    {
      title: 'Activities',
      items: ['Logs'],
      active: 'Timeline',
    },
  ];






  allLogs: any[] =[];







  constructor(private libraryService:LibraryService) {
    //constructor
  }



  ngOnInit(){
    console.log('hallo from logs')
    this.getLogs();
  }






  getLogs(): void {
    this.libraryService.getLogs().subscribe(
      (data: any[]) => {
        this.allLogs = data;
        console.log(this.allLogs)

      },
      (error) => {
        console.error('Error fetching emails:', error);
      }
    );
  }










}


















