import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://127.0.0.1:8000/api';  // Adjust this URL based on your Django server

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true }).pipe(
      map((response: any) => {
        localStorage.setItem('jwt', response.jwt);  // Store only the JWT string
        return response;
      })
    );
  }

  // getUser(): Observable<any> {
  //   const token = localStorage.getItem('jwt');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get(`${this.baseUrl}/user`, { headers });
  // }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      map(response => {
        localStorage.removeItem('jwt');
        return response;
      })
    );
  }

  getStudents(): Observable<any> {
    const token = localStorage.getItem('jwt');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/user/`, { headers });
  }
  getStudent(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/user/${id}/`, { headers });
  }
  addStudent(data: any): Observable<any> {
    // const token = localStorage.getItem('jwt');
    //const headers = new HttpHeaders().set('Authorization');
    return this.http.post(`${this.baseUrl}/user/`, data,);
  }

  updateStudent(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/user/${id}/`, data, { headers });
  }

  deleteStudent(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/user/${id}/`, { headers });
  }

}
