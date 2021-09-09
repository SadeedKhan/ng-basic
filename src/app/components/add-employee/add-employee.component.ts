import { IEmployee } from './../detail-employee/detail-employee.component';
import { Icities, Icountry, Istate } from './../../country';
import { CrudService } from './../../services/crud.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, OnInit, Output } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent  {

title:string=""

  titleAlert: string = 'This field is required';
  post: any = '';
countries : Icountry[]=[];
states:Istate[]=[];
cities:Icities[]=[];
  employeeForm :FormGroup;
  empId:number=0;
firstName: string="" ;
lastName: string="";
dateofBirth:string=new Date().toISOString().slice(0, 10);
emailId: number=0;
gender:string="";
address: string="";
pincode: string="";
country: string="";
state: string="";
city:string="";


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _snackBar: MatSnackBar ,private fb: FormBuilder ,public dialog: MatDialog , private CrudService:CrudService) { 
 
    this.employeeForm = fb.group({
      'firstName':[this.data.firstName ,[Validators.required ,Validators.minLength(3), Validators.maxLength(20)] ],
      'lastName':[ this.data.lastName , Validators.required],
      'dateofBirth':[this.data.dateofBirth , Validators.required],
      'emailId':[ this.data.emailId  , Validators.required],
     'address':[ this.data.address , Validators.required],
      'pincode':[this.data.pincode  , Validators.required],
      'countryId':[ this.data.countryId  , Validators.required],
      'stateId':[this.data.stateId , Validators.required],
      'cityid':[ this.data.cityid , Validators.required],
      'gender':[ this.data.gender , Validators.required],
      'empId':[this.data?.empId ? +this.data.empId :0 ,  Validators.required],
    })
    this.countries=[];
    this.states=[];
    this.cities=[];
    this.title=this.data.action
  }

  ngOnInit() {
this.getCountries()

if(this.data.action === 'Update'){
  this.onChangeCountry(this.data.countryId)
  this.onChangeState(this.data.stateId)
}

  }

  getCountries(){
this.CrudService.getCountries().subscribe(res=>{
  this.countries = res ;
  console.log("countries" ,this.countries)
})
  }


  onChangeCountry(countryId: number) {
    if (countryId) {
      this.CrudService.getStates(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = [];
          console.log("state" ,this.states)
        }
      );
    } else {
      this.states = [];
      this.cities = [];
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.CrudService.getCities(stateId).subscribe(
        data => {
          this.cities = data;
          console.log("cities" ,this.cities)
        }

        
      );
    } else {
      this.cities = [];
    }
  }

  onFormSubmit(emp:any)
  {
let date = JSON.stringify(emp.dateofBirth)
emp.dateofBirth = date.slice(1,11)
if(emp.empId > 0){

  console.log("updated")
  this.CrudService.updateEmployee(emp).subscribe((res: any)=>{
    this._snackBar.open("employee updated successfully" ,'ok', {
      duration: 2000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
    // this.CrudService.getUsers()
    // this.employee = res
    this.employeeForm.reset()
   this.CrudService.sendMessage([]);
    this.handleCancel()
  
  })
}
else{
  this.CrudService.addEmployee(emp).subscribe((res: any)=>{
  this._snackBar.open("employee added successfully" ,'ok', {
    duration: 2000,
    verticalPosition: 'top', 
    horizontalPosition: 'center', 
  });
  // this.CrudService.getUsers()
  // this.employee = res
  this.employeeForm.reset()
 this.CrudService.sendMessage([]);
  this.handleCancel()

})
}

  
}
  handleCancel(){
    this.dialog.closeAll()
  }

}
