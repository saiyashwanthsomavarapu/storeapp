import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {

  optionList:any;
  subscription:any;
  constructor(private http:HttpClient,public auth:AuthService,private platform:Platform) { }

  ngOnInit() {

    // let headers = {'Content-Type':'application/json; charset=utf-8'}
   this.allList();
  }

  allList(){
    this.http.get(this.auth.host+"/joins.php?tab=options").subscribe(res=>{
      console.log(res);
      this.optionList = res;
    })
  }
  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
  });

  

  }

ionViewWillLeave(){
      this.subscription.unsubscribe();
}
  /**
   * 
   */


  /**
   * 
   */
  electrical(){
  }
}
