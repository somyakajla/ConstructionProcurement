import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProjectBid } from './project-bid.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AcceptBidService {

  selectedProjectBid: ProjectBid = {
    projectName: '',
    contractorEmail: '',
    startDate: '',
    endDate: '',
    city: '',
    state: '',
    contractorName: '',
    phoneNumber: '',
    budget: '',
    bidStatus: ''
  };

  constructor(private http: HttpClient) { 

  }

  getProjectBidList(name: string): Observable<ProjectBid[]> {
    return this.http.get<ProjectBid[]>(environment.apiBaseUrl + '/projectBidList', {
      params: { projectName: name }
    });
  }

  acceptBid(name: string, email): Observable<any> {
    return this.http.get<any>(environment.apiBaseUrl + '/acceptWinningBid', {
      params: { projectName: name , contractorEmail: email}
    });
  }


}
