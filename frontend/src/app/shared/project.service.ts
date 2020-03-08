import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { ProjectBid } from './project-bid.model';

import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
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


  constructor(private http: HttpClient) { }

  postProject(project: Project) {
    return this.http.post(environment.apiBaseUrl + '/createProject', project);
  }

  getProjectList(email: string): Observable<Project[]> {
    return this.http.get<Project[]>(environment.apiBaseUrl + '/projects', {
      params: { ownerEmail: email }
    });
  }

  getProject(name: string): Observable<Project> {
    return this.http.get<Project>(environment.apiBaseUrl + '/project', {
      params: { projectName: name }
    });
  }

  getProjectOpenList(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.apiBaseUrl + '/openProjects', {
      params: { status: 'open' }
    });
  }

  getProjectBiddingList(email: string): Observable<ProjectBid[]> {
    return this.http.get<ProjectBid[]>(environment.apiBaseUrl + '/bidProjects', {
      params: { contractorEmail: email }
    });
  }

  // bid on project
  postBidProject(projectBid: ProjectBid) {

    return this.http.post(environment.apiBaseUrl + '/bidProject', projectBid);
  }


  deleteProject(name) {
    alert('one');
    return this.http.delete(environment.apiBaseUrl + '/deleteProject',
      {
        params: { projectName: name }
      });
  }

  updateProject(project: Project) {
    alert('hello 1111'+project.projectName);
    return this.http.post(environment.apiBaseUrl + '/updateProject', project);
  }
}
