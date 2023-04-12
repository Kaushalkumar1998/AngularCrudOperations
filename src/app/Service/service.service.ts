import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  public postUser(user: any) {
    return this.http.post(`${this.baseUrl}create-user`, user);
  }
  public updateUser(user: any) {
    return this.http.put(`${this.baseUrl}update-user`, user);
  }

  public getAll() {
    return this.http.get(`${this.baseUrl}get-all`);
  }
  public deleteData(id: number) {
    return this.http.delete(`${this.baseUrl}delete-user/${id}`);
  }
}
