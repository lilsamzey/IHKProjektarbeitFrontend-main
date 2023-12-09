


import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import{StudentdetailsComponent} from '../studentdetails/studentdetails.component'


import {StudentsService} from '../all-students/students.service'
import { AuthService } from '@core';

import {
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
} from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {studentNotes} from './studentnotes.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-studentnotes',
  templateUrl: './studentnotes.component.html',
  styleUrls: ['./studentnotes.component.scss']
})


export class StudentnotesComponent implements OnInit {
  mode = new UntypedFormControl('side');
  noteForm: UntypedFormGroup;
  showFiller = false;
  isNewNote = false;
  dialogTitle?: string;
  userId!:number;
  //studentId!:number;



  notes: studentNotes[] = [];


   @Input() studentNotes:any[]=[];
   @Input() studentId!: number;


  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private studentsService:StudentsService,
    private authService: AuthService, private studentdetailsComponent: StudentdetailsComponent) {
    const blank = {} as studentNotes;
    this.noteForm = this.createFormGroup(blank);

    this.fetch((data: studentNotes[]) => {
      this.notes = data;
    });
  }





  ngOnInit() {

       this.getStudentNotes(this.studentId);
  }









  fetch(cb: (i: studentNotes[]) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/task.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }



  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }


  toggle(task: { done: boolean }, nav: MatSidenav) {
    nav.close();
    task.done = !task.done;
  }


 addNewTask(nav: MatSidenav) {
    this.resetFormField();
    this.isNewNote = true;
    this.dialogTitle = 'New Note';

    this.userId=this.authService.currentUserValue.id
    nav.open();
  }


  taskClick(note: studentNotes, nav: MatSidenav): void {
    this.isNewNote = false;
    this.dialogTitle = 'Edit Note';
    nav.open();
    this.noteForm = this.createFormGroup(note);
  }


  closeSlider(nav: MatSidenav) {
    nav.close();
  }



  createFormGroup(data: studentNotes) {


    return this.fb.group({
      NoteId:[data ? data.NoteId
        : ''],
      userId: [data ? data.AuthorID
        : ''],
      studentId: [data ? data.StudentId : ''],
      priority: [data ? data.Priority : null],
      note: [data ? data.NoteText : null],
    });
  }



  getStudentNotes(studentId: number) {
    this.studentsService.getStudentNotes(studentId).subscribe((result) => {
      this.studentNotes = result;
    });
  }






  saveNewNote(nav: MatSidenav) {
    if (this.noteForm.value.note != null && this.noteForm.value.note.trim() !== '') {
      this.notes.unshift(this.noteForm.value);
      this.noteForm.value.userId = this.userId;
      this.noteForm.value.studentId = this.studentId;

      this.studentsService.addStudentNotes(this.noteForm.value).subscribe(() => {

        this.refreshNotes();
        nav.close();

         //   this.refreshNotes();
      }, (error: unknown) => {
        console.log(error)
        Swal.fire('Error', 'Note cann not be empty', 'error');
      });
    } else {
      // Not boş olduğunda hata mesajını göster
      Swal.fire('Error', 'Note cann not be empty', 'error');
    }








  }

  refreshNotes() {
    this.studentsService.getStudentNotes(this.studentId).subscribe((result: any) => {


      this.studentNotes = result;
    }, (error) => {
      console.log('Hata:', error);
    });
  }




  saveEditedNote(nav: MatSidenav) {

    this.studentsService.updateStudentNotes(this.noteForm.value).subscribe(
      response => {
        console.log("Updating note is succesful"); // Sunucudan gelen cevabı burada
        this.refreshNotes();
      },
      error => {
        console.error(error); // Hata durumunda burada
      }
    );

    this.refreshNotes();
    // const targetIdx = this.notes
    //   .map((item) => item.StudentId)
    //   .indexOf(this.noteForm.value.id);
    // this.notes[targetIdx] = this.noteForm.value;

       nav.close();

  }


  deleteNote(nav: MatSidenav) {
    // const targetIdx = this.notes
    //   .map((item) => item.NoteId
    //   )
    //   .indexOf(this.noteForm.value.id);
    // this.notes.splice(targetIdx, 1);

     this.studentsService.deleteStudentNotes(this.noteForm.value.NoteId).subscribe(
      response => {
        this.refreshNotes();
        console.log("Deleting is succesful"); // Sunucudan gelen cevabı burada
      },
      error => {
        console.error("Deleting error"); // Hata durumunda burada
      }
    );
    this.refreshNotes();
    nav.close();

  }

  resetFormField() {

    this.noteForm.controls['priority'].reset();
    this.noteForm.controls['note'].reset();
  }

}
