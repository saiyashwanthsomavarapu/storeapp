import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  items:any;
  constructor(private model:ModalController, private navparams:NavParams,public auth:AuthService) { }

  ngOnInit() {

    this.items  =  JSON.parse(this.navparams.data.json);
  }

  async closeModal(){
    const onCloseData:string = "Wrapped Up!";
    await this.model.dismiss(onCloseData);
  }
}
