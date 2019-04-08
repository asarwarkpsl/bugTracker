import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, USERNAME_KEY } from '../../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService,
    private loadingCtrl: LoadingController, private storage: Storage) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.storage.get(USERNAME_KEY).then(val => {
      this.loginForm.patchValue({ email: val });
    })
  }

  login() {
    this.loadingCtrl.create({
      message: 'Loading...'
    }).then(loading => loading.present());

    this.authService.login(this.loginForm.getRawValue()).subscribe(res => {
      this.loadingCtrl.dismiss();
    }, err => {
      this.loadingCtrl.dismiss();
    });
  }
}
