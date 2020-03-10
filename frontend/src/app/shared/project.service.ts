import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { ProjectBid } from './project-bid.model';
import {ProgressTimeline} from '../shared/progress-timeline.model'

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

  selectedProgress: ProgressTimeline = {
    projectName: '',
    contractorEmail: '',
    currentTime:'',
    description: ''
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
    return this.http.get<ProjectBid[]>(environment.apiBaseUrl + '/getContractorBids', {
      params: { contractorEmail: email }
    });
  }

  // bid on project
  postBidProject(projectBid: ProjectBid) {
    return this.http.post(environment.apiBaseUrl + '/bidProject', projectBid);
  }


  deleteProject(name) {
    return this.http.delete(environment.apiBaseUrl + '/deleteProject',
      {
        params: { projectName: name }
      });
  }

  updateProject(project: Project, pName : String) {
    return this.http.put(environment.apiBaseUrl + '/updateProject', {
      params : { projectName : pName},
      body: project
    });
  }

  getProgressTimelineList(pName: string): Observable<ProgressTimeline[]> {
    return this.http.get<ProgressTimeline[]>(environment.apiBaseUrl + '/getProjectTimelineList', {
      params: { projectName: pName }
    });
  }

  // bid on project
  postProgressTimeline(progressTimeline: ProgressTimeline) {
    return this.http.post(environment.apiBaseUrl + '/createProgressTimeline', progressTimeline);
  }
}
