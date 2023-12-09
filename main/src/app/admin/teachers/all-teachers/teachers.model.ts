

export class Teachers {
  TeacherId: number;

  firstName: string;
  lastName: string;
  email: string;
  date: string;
  gender: string;
  mobile: string;
  department: string;
  degree: string;
  password: string;
  confirmPassword: string;
  designation: string;
  address: string;
  dob: string;
  uploadFile: string;

  constructor(teachers: Teachers) {
    this.TeacherId = teachers.TeacherId

    this.firstName = teachers.firstName || '';
    this.lastName = teachers.lastName || '';
    this.email = teachers.email || '';
    this.date = teachers.date;
    this.gender = teachers.gender || '';
    this.mobile = teachers.mobile || '';
    this.department = teachers.department || '';
    this.degree = teachers.degree || '';
    this.password = teachers.password || '';
    this.confirmPassword = teachers.confirmPassword || '';
    this.designation=teachers.designation;
    this.address=teachers.address;
    this.dob=teachers.dob;
    this.uploadFile=teachers.uploadFile;

  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
