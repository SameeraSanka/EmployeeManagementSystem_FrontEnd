import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IEmployee } from '../../Models/InterFace/IEmployee';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.BASE_URL);
  }

  getEmployeeById(id: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.BASE_URL}/${id}`);
  }

  addEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.BASE_URL, employee);
  }

  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.BASE_URL}/${employee.id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
