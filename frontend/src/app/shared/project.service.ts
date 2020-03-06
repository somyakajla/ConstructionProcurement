import { Injectable } from '@angular/core';

import { Project } from './project.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject: Project = {
    Project: '',
    Owner: '',
    Duration: '',
    Budget: '',
    Location: ''
  };

  constructor(private http: HttpClient) { }

  postProject(project: Project){
    return this.http.post(environment.apiBaseUrl+'/project',project);
  }
}
