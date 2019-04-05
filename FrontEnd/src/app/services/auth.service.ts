import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.url;
  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  register(credentials): Observable<any> {
    return this.http.post(`${this.url}/users`, credentials).pipe(
      catchError(e => {
        this.showAlert('Oops something went wrong, please try later');
        throw new Error(e);
      })
    );
  }
  

  showAlert(msg) {

    let alert = this.alertCtrl.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert=>alert.present());
  }
}
