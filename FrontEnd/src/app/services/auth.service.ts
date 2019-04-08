import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertController, Platform } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'access_token';
export const USERNAME_KEY = 'username_key'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  user = null;

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, private alertCtrl: AlertController, private storage: Storage,
    private helper: JwtHelperService, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        this.user = this.helper.decodeToken(token);
        this.authenticationState.next(true);
      }
    });
  }
  register(credentials): Observable<any> {
    return this.http.post(`${this.url}/users`, credentials).pipe(
      catchError(e => {
        this.showAlert('Oops something went wrong, please try later');
        throw new Error(e);
      })
    );
  }

  login(credentials): Observable<any> {
    return this.http.post(`${this.url}/users/login`, credentials).pipe(
      tap(res => {
        this.storage.set(TOKEN_KEY, res['token']);
        this.storage.set(USERNAME_KEY, credentials.email);
        this.user = this.helper.decodeToken(res['token']);

        this.authenticationState.next(true);
      }),
      catchError(e => {
        this.showAlert('Oops something went wrong, please try later');
        throw new Error(e);
      })
    );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);

    });
  }

  showAlert(msg) {

    let alert = this.alertCtrl.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
