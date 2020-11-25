import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {

  itemForm: FormGroup;
  items: any;
  id: any;
  update: boolean = false;
  constructor(private http: HttpClient, private formbuilder: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.itemForm = this.formbuilder.group({
      "item_name": new FormControl('', [Validators.required])
    })
    this.intial();
  }



  intial() {
    this.http.get(this.auth.host+"/getdataviatable.php?tab=item").subscribe(res => {
      console.log(res);
      this.items = res;
    })
  }

  addItems(formDirective,index) {
    console.log(this.itemForm.value)
    if (this.update) {
      this.http.post(this.auth.host+'/updatedocviatable.php?tab=item&id='+index, this.itemForm.value).subscribe(res => {
        if (res['status'] == true) {
          this.intial();
          formDirective.resetForm();
          this.itemForm.reset();
        }
        this.update = false
      });
    } else {
    
      this.http.post(this.auth.host+'/insertdocviatable.php?tab=item', this.itemForm.value).subscribe(res => {
        if (res['status'] == true) {
          this.intial();
          formDirective.resetForm();
          this.itemForm.reset();
        }else {
          this.auth.presentAlert('Alert','','Alredy Exist');
        }
      })
    }
  }

  delete(index) {
    this.http.get(this.auth.host+'/deletedecviatable.php?tab=item&id=' + index).subscribe(res => {
      console.log(res);
      this.intial();
    })
  }
  edit(index) {
    // alert(index);
    this.http.get(this.auth.host + '/getsingledocviatbale.php?tab=item&id=' + index).subscribe(res => {
      console.log(res);
      this.id = res[0].id;
      this.itemForm = this.formbuilder.group({
        "item_name": new FormControl(res[0].item_name, [Validators.required])
      })
      this.update = true;
    })
  }
}
