import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit {

  private projectForm: FormGroup;

  constructor(private projectService: ProjectsService,private fb:FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    });
  }

  save() {
    this.projectService.createProject(this.projectForm.getRawValue()).subscribe(res => {
      console.log("Saved Project:", res)
    }, err => { })
  }

  discard() {

  }
}
