




import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import {CoursesServiceService} from '../courses-service.service'

@Component({
  selector: 'app-coursescharts',
  templateUrl: './coursescharts.component.html',
  styleUrls: ['./coursescharts.component.scss']
})



export class CourseschartsComponent {
  breadscrums = [
    {
      title: 'Echart',
      items: ['Charts'],
      active: 'Echart',
    },
  ];





  courseData:any[] = [];
  totalCourses!:number;
  totalStudents!:number;


  filteredCourses: any[] = [];
  searchText = '';



  barChartOptions!: EChartsOption;

  constructor(private coursesServiceService:CoursesServiceService

    ) {


    this.createCourseChart(this.courseData);
  }





  pie_chart: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    series: [
      {
        name: 'Chart Data',
        type: 'pie',
        radius: '55%',
        center: ['50%', '48%'],
        data: [], // We'll fill this with course data
      },
    ],
    color: ['#575B7A', '#DE725C', '#DFC126', '#72BE81', '#50A5D8'],
  };






  ngOnInit(): void {

this.CourseStudentCounts()



  }





  CourseStudentCounts(){



    this.coursesServiceService.CourseStudentCounts().subscribe(data => {
      this.courseData = data; // API'den gelen verileri courseData'ya atıyoruz
      this.filterCourses();
      console.log(this.courseData)
      this.createCourseChart(this.courseData); // Grafik oluşturucuya verileri iletiyoruz
      const chartData = this.courseData.map(course => {
        return {
          value: course.EnrolledStudents,
          name: course.courseName,
        };
      });
      (this.pie_chart.series as echarts.SeriesOption[])[0].data = chartData;
    });

  }





  filterCourses() {
    this.filteredCourses = this.courseData.filter(course => {
      return course.courseName.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }







  // line bar chart
  line_bar_chart: EChartsOption = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
    },
    xAxis: {
      data: ['2014', '2015', '2016', '2017', '2018'],
      axisLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [11, 14, 8, 16, 11, 13],
      },
      {
        name: 'profit',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        data: [10, 7, 17, 11, 15],
        symbolSize: 10,
      },
      {
        name: 'growth',
        type: 'bar',
        data: [10, 14, 10, 15, 9, 25],
      },
    ],
    color: ['#9f78ff', '#3FA7DC', '#F6A025'],
  };

  // line chart
  line_chart: EChartsOption = {
    grid: {
      top: '6',
      right: '0',
      bottom: '17',
      left: '25',
    },
    xAxis: {
      data: ['2014', '2015', '2016', '2017', '2018'],
      axisLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#eaeaea',
        },
      },
      axisLabel: {
        fontSize: 10,
        color: '#9aa0ac',
      },
    },
    series: [
      {
        name: 'sales',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        data: [15, 22, 14, 31, 17, 41],
        symbolSize: 10,
        // color: ["#FF8D60"]
      },
      {
        name: 'Profit',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(0,0,0,0.4)',
          shadowBlur: 10,
          shadowOffsetY: 10,
        },
        symbolSize: 10,
        // size: 10,
        data: [8, 12, 28, 10, 10, 12],
        // color: ["#009DA0"]
      },
    ],
    color: ['#3FA7DC', '#F6A025'],
  };









  createCourseChart(courseData: { courseName: string, EnrolledStudents: number }[]) {
    const categories = courseData.map(course => course.courseName);
    const studentCounts = courseData.map(course => course.EnrolledStudents);

    this.totalCourses = courseData.length;
    this.totalStudents = studentCounts.reduce((total, count) => total + count, 0);



    this.barChartOptions = {
      grid: {
        top: '8',
        right: '0',
        bottom: '120', // Artırarak deneyin
        left: '25',
      },
      xAxis: {
        data: categories,
        axisLabel: {
          fontSize: 12,
          color: '#000000',
          rotate: 90, // Etiketleri döndürme
          interval: 0
        },
    },
    tooltip: {
      show: true,
      showContent: true,
      alwaysShowContent: false,
      triggerOn: 'mousemove',
      trigger: 'axis',

    },
    yAxis: {
      axisLabel: {
        fontSize: 11,
        color: '#9aa0ac',
      },
    },
    series: [
      {
        name: 'Students',
        type: 'bar',
        data: studentCounts,
        label: { // Kurs ismini içeren metni eklemek için label özelliği
          show: true,
          position: 'inside', // Metni sütunun üst kısmına yerleştir
          rotate: 90,
          formatter: function(params: any) {
            return categories[params.dataIndex] + '  ' + params.data ;
          }
        }
      }
    ],
    color: ['#850FCA'],
  };






  }
















  // graph line chart
  graph_line_chart: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['sales', 'purchases'],
      textStyle: {
        color: '#9aa0ac',
      },
    },
    toolbox: {
      show: !1,
    },
    xAxis: [
      {
        type: 'category',
        data: ['2000', '2001', '2002', '2003', '2004', '2005'],
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    series: [
      {
        name: 'sales',
        type: 'bar',
        data: [22, 54, 37, 23, 25.6, 76],
        markPoint: {
          data: [
            {
              type: 'max',
              name: '???',
            },
            {
              type: 'min',
              name: '???',
            },
          ],
        },
        markLine: {
          data: [
            {
              type: 'average',
            },
          ],
        },
      },

      {
        name: 'purchases',
        type: 'bar',
        data: [35, 45, 47, 10, 35, 70],
        markLine: {
          data: [
            {
              type: 'average',
            },
          ],
        },
      },
    ],
    color: ['#9f78ff', '#32cafe'],
  };









  // /* Pie Chart */
  // pie_chart: EChartsOption = {
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)',
  //   },
  //   legend: {
  //     data: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
  //     textStyle: {
  //       color: '#9aa0ac',
  //       padding: [0, 5, 0, 5],
  //     },
  //   },

  //   series: [
  //     {
  //       name: 'Chart Data',
  //       type: 'pie',
  //       radius: '55%',
  //       center: ['50%', '48%'],
  //       data: [
  //         {
  //           value: 335,
  //           name: 'Data 1',
  //         },
  //         {
  //           value: 310,
  //           name: 'Data 2',
  //         },
  //         {
  //           value: 234,
  //           name: 'Data 3',
  //         },
  //         {
  //           value: 135,
  //           name: 'Data 4',
  //         },
  //         {
  //           value: 548,
  //           name: 'Data 5',
  //         },
  //       ],
  //     },
  //   ],
  //   color: ['#575B7A', '#DE725C', '#DFC126', '#72BE81', '#50A5D8'],
  // };

















  // area line chart
  area_line_chart: EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Intent', 'Pre-order', 'Deal'],
      textStyle: {
        color: '#9aa0ac',
        padding: [0, 5, 0, 5],
      },
    },
    toolbox: {
      show: !0,
      feature: {
        magicType: {
          show: !0,
          title: {
            line: 'Line',
            bar: 'Bar',
            stack: 'Stack',
          },
          type: ['line', 'bar', 'stack'],
        },
        restore: {
          show: !0,
          title: 'Restore',
        },
        saveAsImage: {
          show: !0,
          title: 'Save Image',
        },
      },
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: !1,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          color: '#9aa0ac',
        },
      },
    ],
    series: [
      {
        name: 'Deal',
        type: 'line',
        smooth: !0,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [10, 12, 21, 54, 260, 830, 710],
      },
      {
        name: 'Pre-order',
        type: 'line',
        smooth: !0,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [30, 182, 434, 791, 390, 30, 10],
      },
      {
        name: 'Intent',
        type: 'line',
        smooth: !0,
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        data: [1320, 1132, 601, 234, 120, 90, 20],
      },
    ],
    color: ['#9f78ff', '#fa626b', '#32cafe'],
  };

  pie_chart2: EChartsOption = {
    legend: {
      top: 'bottom',
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: '55%',
        center: ['50%', '48%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' },
        ],
      },
    ],
  };

  // sunburst chart
  sunburst_chart: EChartsOption = {
    series: {
      type: 'sunburst',
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data: [
        {
          name: 'Grandpa',
          children: [
            {
              name: 'Uncle Leo',
              value: 15,
              children: [
                {
                  name: 'Cousin Jack',
                  value: 2,
                },
                {
                  name: 'Cousin Mary',
                  value: 5,
                  children: [
                    {
                      name: 'Jackson',
                      value: 2,
                    },
                  ],
                },
                {
                  name: 'Cousin Ben',
                  value: 4,
                },
              ],
            },
            {
              name: 'Father',
              value: 10,
              children: [
                {
                  name: 'Me',
                  value: 5,
                },
                {
                  name: 'Brother Peter',
                  value: 1,
                },
              ],
            },
          ],
        },
        {
          name: 'Nancy',
          children: [
            {
              name: 'Uncle Nike',
              children: [
                {
                  name: 'Cousin Betty',
                  value: 1,
                },
                {
                  name: 'Cousin Jenny',
                  value: 2,
                },
              ],
            },
          ],
        },
      ],
      radius: [0, '90%'],
      label: {
        rotate: 'radial',
      },
    },
  };

}




