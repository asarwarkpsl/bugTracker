import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(`${this.url}/projects`);
  }

  createProject(newProject) {
    return this.http.post(`${this.url}/projects`, newProject);
  }

  addComponent(projID, component) {
    return this.http.post(`${this.url}/components/` + projID, component);
  }
}
