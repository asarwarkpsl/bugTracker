import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit {

  private projectForm: FormGroup;
  private compoents: any[] = new Array();

  constructor(private projectService: ProjectsService, private fb: FormBuilder, private router: Router,
    private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    });
  }

  save() {
    this.projectService.createProject(this.projectForm.getRawValue()).subscribe(res => {

    }, err => { })
  }

  discard() {

  }

  async addComponent() {
    const alert = await this.alertCtrl.create({
      header: 'Add new component',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Component name',
        },
        {
          name: 'desc',
          type: 'text',
          placeholder: 'Component description',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            this.projectService.addComponent('5cb43b414773a33e4c8d46a9', data).subscribe(res => {
              this.compoents.push(data);

              //create toster
              this.toastCtrl.create({
                message: 'Component Added',
                position: 'top',
                duration: 2000
              }).then(toast => toast.present());
            }, err => { });
          }
        }
      ]
    });

    alert.present();
  }
}
