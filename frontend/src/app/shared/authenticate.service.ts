import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggedInUser } from './user.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {
  private currentUserSubject: BehaviorSubject<LoggedInUser>;
  public currentUser: Observable<LoggedInUser>;
  
  selectedUser: LoggedInUser = {
    email: '', 
    type: '',
    token: ''
  };

  constructor(private http: HttpClient) 
  { 
    this.currentUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoggedInUser {
    return this.currentUserSubject.value;
``}

  login(email: string, passcode: string){
    return this.http.post<any>(environment.apiBaseUrl + '/login', { email, passcode })
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;  
          }
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
