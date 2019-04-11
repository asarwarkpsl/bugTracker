import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: 'app/bugs', loadChildren: '../bugs/bugs.module#BugsPageModule' },
      { path: 'app/projects', loadChildren: '../projects/projects.module#ProjectsPageModule' },
     // { path: 'app/add-project', loadChildren: '../add-project/add-project.module#AddProjectPageModule' },
     
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
