import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  projects:Observable<any>;

  constructor(private projectService: ProjectsService,private router:Router) { }

  ngOnInit() {
    this.loadProjects();
  }

  ddNewProject(){
    this.router.navigateByUrl('add-project');
  }

  loadProjects() {
    this.projects= this.projectService.loadProjects();
    
    this.projects.subscribe(res => {
      console.log('Projects:',res);
    }, err => { });
  }

}
