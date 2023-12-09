import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../students.service';
import { Students } from './../students.model';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {

  allStudents: Students[] = [];


  breadscrums = [
    {
      title: 'Basic',
      items: ['Tables'],
      active: 'Basic',
    },
  ];

  constructor(private studentsService: StudentsService) { }



  async ngOnInit(): Promise<void> {
    try {
      this.allStudents = await this.studentsService.getAllStudentss();

    } catch (error) {
      console.error('Error:', error);
    }
  }



}
