



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from '../../students/all-students/students.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Students } from '../../students/all-students/students.model';
import { DataSource } from '@angular/cdk/collections';
import {EditComponent} from '../../students/all-students/dialogs/edit/edit.component'
import {AddadminComponent} from '../admins/addadmin/addadmin.component';
import {AdminserviceService} from '../admins/adminservice.service'


import {DeleteComponent} from '../admins/delete/delete.component'

import {EditadminComponent} from '../admins/editadmin/editadmin.component'


import {StudentdetailsComponent} from '../../students/studentdetails/studentdetails.component';
import {AdmindetailsComponent} from '../admins/admindetails/admindetails.component'


import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from '../../students/all-students/dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from '../../students/all-students/dialogs/delete/delete.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { Direction } from '@angular/cdk/bidi';
import {
  TableExportUtil,
  TableElement,
  UnsubscribeOnDestroyAdapter,
} from '@shared';
import { SendEmailComponent } from 'app/send-email/send-email.component';


import {AuthService} from '../../../core/service/auth.service'

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{


  displayedColumns = [
    'select',
    // 'img',
    'adminId',
    'firstName',
    'lastName',
    
    'email',
    // 'address',
    'details',
    'actions',
  ];
  exampleDatabase?: StudentsService;

 allStudent:Students[]=[];

 allAdmins:any[]=[];
 originalAdmins: any[] = [];
 filteredAdmins: any[] = [];

 searchQuery = '';
 searchText = '';


 studentUserName!: string;
 studentUserPassword!: string;

  
  selection = new SelectionModel<Students>(true, []);
  id?: number;
  students?: Students;
  breadscrums = [
    {
      title: 'All Admins',
      items: ['Admins'],
      active: 'All Admin',
    },
  ];


  adminId!: number;


  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentsService: StudentsService,
    private snackBar: MatSnackBar,
    private adminserviceService:AdminserviceService,


    public authService:AuthService
    //private studentdetailsComponent:StudentdetailsComponent
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  async ngOnInit(): Promise<void> {
    //this.loadData();


    this.getAllAdmins();

    this.refresh()





  }






  getAllAdmins(): void {
    this.adminserviceService.getAllAdmins().subscribe(
      (admins: any) => {
        this.allAdmins = admins;
        console.log('admins ',admins);
        this.filterAdmins()



      },
      (error) => {
        console.error('Hata:', error);
      }
    );}





    filterAdmins() {
      this.filteredAdmins = this.allAdmins.filter(admin => {
        return admin.firstName.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }



















  refresh() {
    this.getAllAdmins();
  }


  async allStudentList(){
  try {
    this.allStudent = await this.studentsService.getAllStudentss();
    this.refresh()

  } catch (error) {
    console.error('Error:', error);
  }
  }


  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(AddadminComponent, {
      data: {
        students: this.students,
        action: 'add',
      },
      direction: tempDirection,

    } );



    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {

      this.refresh();

      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.studentsService.getDialogData()
        );
        this.refreshTable();
        
      }
    });
  }






  editCall(row: any) {
    this.id = row.adminId;


    console.log('admin edit', row)

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EditadminComponent, {
      data: {
        admin: row,
        action: 'edit',
      },
      direction: tempDirection,
    });



    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {

      this.refresh();

      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.studentId === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.studentsService.getDialogData();

          // And lastly refresh table
          this.refreshTable();
         
        }
      }
    });

  }





  deleteItem(row: any) {
    this.adminId = row.adminId;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {

      this.refresh();
      if (result === 1) {
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.studentId === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
          
        }
      }
    });
  }











  async adminDetails(row: any) {


    this.id = row.adminId;


    console.log(row.adminId)



       let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dialogRef = this.dialog.open(AdmindetailsComponent, {
      data: {
        admin: row,
        action: 'edit',
      },
      direction: tempDirection,
    });


    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
    //       (x: any) => x.id === this.id
    //     );
    //     // Then you update that record using data from dialogData (values you enetered)
    //     if (foundIndex != null && this.exampleDatabase) {
    //       this.exampleDatabase.dataChange.value[foundIndex] =
    //         this.studentsService.getDialogData();
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



























  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
 
  exportExcel() {
    console.log('export exell')
  }

  









  sendEmail(email:string){


    console.log('detaydan gelen' + email)

    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(SendEmailComponent, {
      data: {
        email: email,
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
          // And lastly refresh table
          // this.refreshTable();
          // this.showNotification(
          //   'black',
          //   'Edit Record Successfully...!!!',
          //   'bottom',
          //   'center'
          // );
        }








}




