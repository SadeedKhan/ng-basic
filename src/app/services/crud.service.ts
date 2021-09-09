import { IEmployee } from './../components/detail-employee/detail-employee.component';
import { Icities, Icountry, Istate } from './../country';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import axios from 'axios';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
// import { IEmployee } from '../components/detail-employee/detail-employee.component';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // public employees:IEmployee[] = []
// public subject = new Subject<IEmployee[]>();

 private subject = new  BehaviorSubject<IEmployee[]>([]);

  constructor( private http:HttpClient) { }
  getUsers():Observable<IEmployee[]>{
return this.http.get<IEmployee[]>("https://localhost:44326/api/AngulerWebApp/AllEmployeeDetails")
  }
  getCountries():Observable<Icountry[]>{
    return this.http.get<Icountry[]>("https://localhost:44326/api/AngulerWebApp/Country")
  }
  getStates(id:number):Observable<Istate[]>{
    return this.http.get<Istate[]>(`https://localhost:44326/api/AngulerWebApp/Country/${id}/State`)
  }

  getCities(id:number):Observable<Icities[]>{
    return this.http.get<Icities[]>(`https://localhost:44326/api/AngulerWebApp/State/${id}/City`)
  }

  addEmployee(data:IEmployee):any{
    var myHeaders = new HttpHeaders().set('Content-Type','application/json');

    return this.http.post(`https://localhost:44326/api/AngulerWebApp/InsertEmployeeDetails`,JSON.stringify(data),{headers:myHeaders}).pipe(catchError(err=>throwError("something went wrong")))
  }

  updateEmployee(data:IEmployee):any{
    var myHeaders = new HttpHeaders().set('Content-Type','application/json');

    return this.http.put(`https://localhost:44326/api/AngulerWebApp/UpdateEmployeeDetails`,JSON.stringify(data),{headers:myHeaders}).pipe(catchError(err=>throwError("something went wrong")))
  }

  sendMessage(data:IEmployee[]){
    this.subject.next(data);
  }
  getMessage():Observable<any>{

    return this.subject.asObservable();

  }
  deleteEmployee(id:number){
return this.http.delete(`https://localhost:44326/api/AngulerWebApp/DeleteEmployeeDetails?id=${id}`)
  }

}




