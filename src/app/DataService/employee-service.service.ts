import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  readonly ApiUrl = 'http:/localhost:5000';

  constructor(private http: HttpClient) { }




  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, this.ApiUrl));
  }


  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = ()  => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }


}

