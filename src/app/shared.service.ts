import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './_Interface/employee';
import { Department } from './_Interface/department';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly apiUrl = 'http://localhost:5000/api';
  readonly photoUrl = 'http://localhost:5000/Photos/';

  constructor(private http: HttpClient) { }

  getDepList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/Department');
  }

  addDepartment = (val: any) => {
    return this.http.post(this.apiUrl + '/Department', val);
  }


  updateDepartment = (id: string, department: Department) => {
    return this.http.put(this.apiUrl + '/Department/' + id, department);
  }

  deleteDepartment = (id: string) =>  {
    return this.http.delete(this.apiUrl + '/Department/' + id);
  }

  getEmpList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/Employees');
  }

  addEmployee = (val: any) => {
    return this.http.post(this.apiUrl + '/Employees', val);
  }

  updateEmployee = (id: string, employee: Employee) => {
    return this.http.put(this.apiUrl + '/Employees/' + id, employee);
  }

  deleteEmployee = (id: string) =>  {
    return this.http.delete(this.apiUrl + '/Employees/' + id);
  }

  UploadPhoto = (val: any) => {
    return this.http.post(this.apiUrl + '/Employees/SaveFile', val);
  }
}
