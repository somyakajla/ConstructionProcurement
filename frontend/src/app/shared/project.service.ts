import { Injectable } from '@angular/core';

import { Project } from './project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  selectedProject: Project = {
    projectName: '',
    ownerEmail: '',
    startDate: '',
    endDate: '',
    city: '',
    state: '',
    contactName: '',
    phoneNumber: '',
    budget: '',
    status: ''
  };

  constructor(private http: HttpClient) { }

  postProject(project: Project){
    return this.http.post(environment.apiBaseUrl+'/project',project);
  }

  // getProjectList(email){
  //   var projects = this.http.get<Project[]>(`${environment.apiBaseUrl}/projects`, {
  //     params: { ownerEmail: email }
  //   }); 

  //   projects.pipe(first()).subscribe(projects => )
  //   return projects;
  // }

  getProjectList(email: string): Observable<any> {
    return this.http.get(environment.apiBaseUrl+'/projects', {
      params: { ownerEmail: email }
    });
  }
}
