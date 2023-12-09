import { Component } from '@angular/core';

@Component({
  selector: 'app-cousestatistics',
  templateUrl: './cousestatistics.component.html',
  styleUrls: ['./cousestatistics.component.scss']
})
export class CousestatisticsComponent {




  breadscrums = [
    {
      title: 'All Course',
      items: ['Courses'],
      active: 'Course Statistics',
    },
  ];

}
