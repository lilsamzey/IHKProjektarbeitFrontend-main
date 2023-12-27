export class Teachers {
  teacherId: number;
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;

  constructor(teachers: Partial<Teachers>) {
    this.teacherId = teachers.teacherId || this.getRandomID(); // Assuming you still want to generate IDs like this
    this.firstName = teachers.firstName || '';
    this.lastName = teachers.lastName || '';
    this.gender = teachers.gender || '';
    this.mobile = teachers.mobile || '';
    this.email = teachers.email || '';
    this.address = teachers.address || '';
  }

  private getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
