export class Courses {
  courseId: number;          
  courseName: string;
  courseDetails: string;
  startDate: string;        
  length: number;            
  creationDate: string;      
  courseGroup: string;       

  constructor(course: Courses) {
    this.courseId = course.courseId  
    this.courseName = course.courseName || '';
    this.courseDetails = course.courseDetails || '';
    this.startDate = course.startDate || '';
    this.length = course.length || 0;
    this.creationDate = course.creationDate || '';
    this.courseGroup = course.courseGroup || '';
  }

}
