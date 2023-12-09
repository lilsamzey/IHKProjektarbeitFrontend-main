

export class Students {
  studentId: number;
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;
  email: string;
  parentName: string;
  parentNo: string;
  address: string;

  constructor(formValue: any) {
    this.studentId = formValue.studentId || this.getRandomID();
    this.firstName = formValue.firstName || '';
    this.lastName = formValue.lastName || '';
    this.gender = formValue.gender || '';
    this.mobile = formValue.mobile || '';
    this.email = formValue.email || '';
    this.parentName = formValue.parentName || '';
    this.parentNo = formValue.parentNo || '';
    this.address = formValue.address || '';
  }



// export class Students {
//   [x: string]: any;
//   StudentId: number;
//   img: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   rDate: string;
//   date: string;
//   dob:string;
//   parentNo: number;
//   gender: string;
//   parentName: string;
//   mobile: string;
//   bGroup:string;
//   department: string;
//   rollNo: string;
//   address:string;
//   uploadFile: string;
//   static studentsService: any;

//   constructor(formValue: any) {
//     this.StudentId = this.getRandomID();
//     this.img = 'assets/images/user/user1.jpg';
//     this.firstName=formValue.first || '';
//     this.lastName=formValue.last || '';
//     this.parentName=formValue.parentName || '';
//     this.dob=formValue.dob || '';
//     this.bGroup=formValue.bGroup || '';
//     this.parentNo=formValue.parentNo;
//     this.email = formValue.email || '';
//     this.date = formValue.date;
//     this.rDate = formValue.rDate;
//     this.gender = formValue.gender || '';
//     this.mobile = formValue.mobile || '';
//     this.department = formValue.department || '';
//     this.rollNo = formValue.rollNo || '';
//     this.address=formValue.address;
//     this.uploadFile=formValue.uploadFile;
//   }

  private getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
