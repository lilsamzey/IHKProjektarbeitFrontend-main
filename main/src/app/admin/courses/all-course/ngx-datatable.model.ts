export class Courses {
  CourseId: number;
  courseName: string;
  courseCode: string;
  courseDetails: string;
  startDate: string;
  length: string;
  price: string;
  teacher: string;
  studentsNumber: string;
  contactNumber: string;
  constructor(course: Courses) {
    {
      this.CourseId = course.CourseId || this.getRandomID();
      this.courseName = course.courseName || '';
      this.courseCode = course.courseCode || '';
      this.courseDetails = course.courseDetails || '';
      this.startDate = course.startDate || '';
      this.length = course.length || '';
      this.price = course.price || '';
      this.teacher = course.teacher || '';
      this.studentsNumber = course.studentsNumber || '';
      this.contactNumber = course.contactNumber || '';
    }
  }
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
