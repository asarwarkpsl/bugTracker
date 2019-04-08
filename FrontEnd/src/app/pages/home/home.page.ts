import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  pages = [
    {
      title: 'All Issues',
      url: 'app/bugs'
    },
    {
      title: 'My assigned Issues',
      url: 'app/bugs'
    },
    {
      title: 'My reported Issues',
      url: 'app/bugs'
    },
    {
      title: 'Todays Issues',
      url: 'app/bugs'
    },
    {
      title: 'Overdue Issues',
      url: 'app/bugs'
    }
  ]

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
