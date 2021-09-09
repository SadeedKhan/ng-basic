import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from './../../services/crud.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild,Inject, InjectionToken } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';


export interface IEmployee {
  empId: number,
  firstName: string,
  lastName: string,
  dateofBirth:string,
  emailId: string,
  gender:string,
  countryId: number,
  stateId: number,
  cityid: number,
  address: string,
  pincode: string,
  country: string,
  state: string,
  city: string
}

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public array: any;
  columns: string[] = ["empId","firstName" ,"lastName" ,"dateofBirth" ,"emailId" ,'gender' ,"address","pincode","country","state","city","Action(s)"];
  dataSource :MatTableDataSource<IEmployee[]> |any;
  employees:IEmployee[];
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private crudService:CrudService,public dialog: MatDialog,private _snackBar: MatSnackBar ) { 

  this.employees = []
  this.dataSource = new MatTableDataSource([]);

  this.crudService.getMessage().subscribe(data=>{
    this.getArray();
   });

 }



  ngOnInit(): void {
    // this.getArray();
  }

private getArray() {
  this.crudService.getUsers().subscribe(data=>{
    this.employees = data
    this.dataSource = new MatTableDataSource(this.employees);
    this.dataSource.paginator = this.paginator;
      this.array = this.employees;
      this.totalSize = this.array.length;
      this.iterator();
  })
}

public handlePage(e: any) {
  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
  this.iterator();
}

private iterator() {
  const end = (this.currentPage + 1) * this.pageSize;
  const start = this.currentPage * this.pageSize;
  const part = this.array.slice(start, end);
  this.dataSource = part;
}

public filterData(event :any){
  const filter = (event.target as HTMLInputElement).value
  if(filter === ""){
    this.dataSource = new MatTableDataSource(this.employees)
  }else{}
 const array = this.employees.filter(it=>it.firstName.includes(filter.toLowerCase()) )
 this.dataSource = new MatTableDataSource(array)

}
openDialog(action :string, obj:any) {
  obj.action = action;
  const dialogRef = this.dialog.open(AddEmployeeComponent, {
    width: '350x',
    data: obj,
  }); 
  dialogRef.afterClosed().subscribe(result => {
    // if(result.event == 'Add'){
    //   ;
    // }else if(result.event == 'Update'){
    //   this.updateRowData(result.data);
    // }else if(result.event == 'Delete'){
    //   this.deleteRowData(result.data);
    // }
  });

}
deleteItem(id:number){
  if(id){
    this.crudService.deleteEmployee(id).subscribe(res =>{
      this._snackBar.open("employee deleted successfully" ,'ok', {
        duration: 2000,
        verticalPosition: 'top', 
        horizontalPosition: 'center', 
      });
     this.crudService.sendMessage([]);
    })
  }
}

}
