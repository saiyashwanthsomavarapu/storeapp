import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ItemsComponent } from '../items/items.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  categories: any;
  finalarray:any=[];
  constructor(public auth: AuthService, private http: HttpClient, private route: ActivatedRoute, private model: ModalController) { }
  ngOnInit() {
    this.cat();
  }

  cat() {
    this.route.params.subscribe(params => {
      // console.log(params)
      this.http.get(this.auth.host + '/joins.php?tab=catbydepart&id=' + params.id).subscribe(res => {
        // console.log(res);
        this.categories = res;
        console.log(this.categories);
        var uniqueCat = this.getUniqueElemnts(this.categories, 'catId');
        // console.log(uniqueCat);
        this.finalarray = []
        for (var i = 0; i < uniqueCat.length; i++) {
          var rec = [];

          for (var j = 0; j < this.categories.length; j++) {
            // console.log(this.categories[j]);
            if (uniqueCat[i] == this.categories[j].catId) {
              rec.push(this.categories[j]);
            }
          }
          // console.log(rec);
          this.finalarray.push({
            "catId": uniqueCat[i],
            "cat_name": rec[0].cat_name,
            "items": rec
          });
        }
        console.log(this.finalarray);
      })

    });

  }
  async items(items) {
    const modal = await this.model.create({
      component: ItemsComponent,
      componentProps: {
        'firstname': '',
        'json': JSON.stringify(items),

      }
    });
    return await modal.present();
  }

  getUniqueElemnts(array, field) {

    var elements = [];
    for (var i in array) {
      if (elements.indexOf(array[i][field]) == -1) {
        elements.push(array[i][field]);
      }
    }
    // console.log(elements);
    return elements;
  }
}
