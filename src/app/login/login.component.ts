import { Component, OnInit, Host } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  subscription:any;
  emailForm:FormGroup;
  constructor(private platform:Platform,private formbuilder: FormBuilder,private http:HttpClient,private router:Router,public auth:AuthService) { }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp();
  });


}

ionViewWillLeave(){
      this.subscription.unsubscribe();
}
  ionViewWillEnter(){
    if(localStorage.getItem('user') == undefined) {
      this.router.navigate(['/login']);
    } else  if(localStorage.getItem('user')=='admin') {
      this.router.navigate(['/admin']);
    } else if(localStorage.getItem('user')=='user') {
      this.router.navigate(['/home/department']);
    } else {
      this.router.navigate(['/login']);

    }
  }
  ngOnInit() {
    
    this.emailForm = this.formbuilder.group({
      "email": new FormControl('', [Validators.required,]),
      'password': new FormControl('', [Validators.required])
    })
    this.http.get("http://shop.santhakumarkanakala.com/auth.php").subscribe(res=>{
      console.log(res);
    })
  }

  submit(formDirective){
    // this.http.post("http://shop.santhakumarkanakala.com/auth.php",this.emailForm.value).subscribe(res=>{
      // console.log(res);
      if(this.emailForm.value.email =='admin@gmail.com' ) {
        localStorage.setItem('user','admin')
        this.router.navigate(['/admin']);
      // } else if(res[0]['email'] == 'user' && res[0]['status']==true) {
      //   localStorage.setItem('user','user')
      //   this.router.navigate(['/home/department']);
      // } else{
      //   this.auth.presentAlert('Alert','','Invalid Credentials');        
      // }
    }
    // ,err=>{
    //   alert(JSON.stringify(err));
    // })
  }
}
