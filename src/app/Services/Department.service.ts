import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../app/envoirment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Create
  create(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/EmployeeController/add`, data);
  }

  // Read
  getItems(data:any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/EmployeeController/GetEmployeeListByQuery`, data);
  }

  // Update
  updateItem(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/EmployeeController/update`, data);
  }

  // Delete
  deleteItem(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/EmployeeController/delete/${id}`);
  }
}
