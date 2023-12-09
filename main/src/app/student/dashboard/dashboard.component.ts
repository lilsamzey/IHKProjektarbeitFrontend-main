import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';





import{AuthService} from '../../core/service/auth.service'
import {StudentService} from '../student.service'

import {CourseinfoComponent} from '../courseinfo/courseinfo.component'








import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexGrid,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import { MatDialog } from '@angular/material/dialog';
import { Direction } from '@angular/cdk/bidi';


export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  fill: ApexFill;
};

export type areaChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  grid: ApexGrid;
  colors: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public barChartOptions!: Partial<barChartOptions>;
  public areaChartOptions!: Partial<areaChartOptions>;






  userName!:string;
  userId!:number;
  studentId!: any;
  courses: any[] =[];
  course={};













  breadscrums = [
    {
      title: 'Dashboard',
      items: ['Student'],
      active: 'Dashboard',
    },
  ];


  constructor(private authService:AuthService,
    private studentService:StudentService,
    public dialog: MatDialog,



    ) {
    //constructor
  }










  // Doughnut chart start

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public doughnutChartLabels: string[] = [
    'Development',
    'Java Classes',
    'Painting ',
    'Geography Class',
  ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [32, 25, 20, 23],
        backgroundColor: ['#5A5FAF', '#F7BF31', '#EA6E6C', '#28BDB8'],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // Doughnut chart end

  ngOnInit() {
    this.userId=this.authService.currentUserValue.id
    this.userName=this.authService.currentUserValue.firstName
    this.getUsersCourses();

    //this.getCurrentStudentId(this.userId);


    this.chart1();
    this.chart2();
  }




// eslint-disable-next-line @typescript-eslint/no-explicit-any
//  getCourseDetails(course:any) {

//   console.log(course.CourseId)
//   this.studentsService.courseIdForCourseDetails=course.CourseId;
//   this.studentsService.course=course;
//   //this.coursedetailsComponent.getCourseDetails
// }




  getUsersCourses(): void {
    this.studentService.getUserCourses(this.userId).subscribe(
      (courses: any) => {
        this.courses = courses;
        console.log('Courses of ',this.userName, courses);
        // Diğer işlemleri burada gerçekleştirin
      },
      (error) => {
        console.error('Hata:', error);
      }
    );}



    details(course: any) {

      console.log('detaydan gelen' + course.CourseId)

      let tempDirection: Direction;
      if (localStorage.getItem('isRtl') === 'true') {
        tempDirection = 'rtl';
      } else {
        tempDirection = 'ltr';
      }
      const dialogRef = this.dialog.open(CourseinfoComponent, {
        data: {
          course: course,
          action: 'edit',
        },
        direction: tempDirection,
      });
      // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      //   if (result === 1) {
      //     // When using an edit things are little different, firstly we find record inside DataService by id
      //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
      //       (x: { id: number | undefined; }) => x.id === this.id
      //     );
      //     // Then you update that record using data from dialogData (values you enetered)
      //     if (foundIndex != null && this.exampleDatabase) {
      //       this.exampleDatabase.dataChange.value[foundIndex] =
      //         this.teachersService.getDialogData();
      //       // And lastly refresh table
      //       this.refreshTable();
      //       this.showNotification(
      //         'black',
      //         'Edit Record Successfully...!!!',
      //         'bottom',
      //         'center'
      //       );
      //     }
      //   }

      // })


    }









  refreshTable() {
    throw new Error('Method not implemented.');
  }
  showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }










  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: 'Mathes',
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: 'Science',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#F77A9A', '#A054F7'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: [
          'test 1',
          'test 2',
          'test 3',
          'test 4',
          'test 5',
          'test 6',
          'test 7',
        ],
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
    };
  }

  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Physics',
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: 'Computer',
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: 'Management',
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: 'Mathes',
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: 'bar',
        height: 330,
        foreColor: '#9aa0ac',
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: 'category',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      },
      legend: {
        show: false,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      fill: {
        opacity: 1,
        colors: ['#25B9C1', '#4B4BCB', '#EA9022', '#9E9E9E'],
      },
    };
  }
























}
