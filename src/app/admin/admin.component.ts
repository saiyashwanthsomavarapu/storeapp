import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Platform } from '@ionic/angular';
// import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(public auth:AuthService, private platform:Platform) { }

  subscription:any;
  ngOnInit() {

  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
  });

  

  }

ionViewWillLeave(){
      this.subscription.unsubscribe();
}
  department(){

  }

}
