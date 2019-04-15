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
proj:any[];

  constructor(private projectService: ProjectsService,private router:Router) { }

  ngOnInit() {
    this.loadProjects();
  }

  ddNewProject(){
    this.router.navigateByUrl('add-project');
  }

  loadProjects() {
    console.log('before subscription:',this.projects);

     this.projects= this.projectService.getProjects();
    
    this.projects.subscribe(res => {
      console.log('DB Projects:' , this.projects = res);
    }, err => { });
  }

}
