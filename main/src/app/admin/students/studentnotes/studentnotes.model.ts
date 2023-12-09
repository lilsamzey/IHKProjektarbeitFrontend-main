
export class studentNotes {
  NoteId: number;
  AuthorID: number;
  StudentId:number;
  Priority: string;
  NoteText: string;


  constructor(note: studentNotes) {
    {
      this.NoteId=note.NoteId;
      this.AuthorID = note.AuthorID;
      this.StudentId=note.StudentId;
      this.NoteText = note.NoteText || '';
      this.Priority = note.Priority || 'Normal';
    }
  }

}
