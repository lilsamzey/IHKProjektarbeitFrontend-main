
export class studentNotes {
  NoteId: number;
  AuthorID: number;
  studentId:number;
  Priority: string;
  NoteText: string;


  constructor(note: studentNotes) {
    {
      this.NoteId=note.NoteId;
      this.AuthorID = note.AuthorID;
      this.studentId=note.studentId;
      this.NoteText = note.NoteText || '';
      this.Priority = note.Priority || 'Normal';
    }
  }

}
