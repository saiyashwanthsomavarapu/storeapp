import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host:any='http://shop.santhakumarkanakala.com';
  constructor(private router:Router, private alert:AlertController) { }

  public isAuthenticated(){
    var token = localStorage.getItem('user');
    return token.toString();
  }



  logoutFunc(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }

  async presentAlert(header,subheader,message) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subheader,
      animated:true,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
