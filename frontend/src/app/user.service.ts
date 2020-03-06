import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { IUser } from './user';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  authenticateUser(user: IUser): Observable<IUser> {
    const url = `${this.baseUrl}`;
    return this.http.post<IUser>(this.baseUrl, user);
  }
}
