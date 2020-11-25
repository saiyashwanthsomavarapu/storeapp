import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemsListComponent implements OnInit {

  itemListForm: FormGroup;
  itemsList: any;
  optionsList: any;
  update: boolean = false;
  id: any;
  constructor(private formbuider: FormBuilder, private http: HttpClient, public auth: AuthService) { }

  ngOnInit() {
    this.itemListForm = this.formbuider.group({
      'department': new FormControl('', [Validators.required]),
      'company': new FormControl('', [Validators.required]),
      'item': new FormControl('', [Validators.required]),
      'subitem': new FormControl('', [Validators.required]),
      'price': new FormControl('', [Validators.required]),

    })
    this.intial()
  }
  intial() {
    this.http.get(this.auth.host + "/joins.php?tab=options").subscribe(res => {
      this.optionsList = res;
      console.log(this.optionsList);
    });
    this.http.get(this.auth.host + "/getdataviatable.php?tab=item_list").subscribe(res => {
      console.log(res);
      this.itemsList = res;
    })
  }

  addItemsList(formDirective,index) {
    console.log(this.itemListForm.value)
    if (this.update) {
      this.http.post(this.auth.host + '/updatedocviatable.php?tab=item_list&id=' + index, this.itemListForm.value).subscribe(res => {
        if (res['status'] == true) {
          this.intial();
          formDirective.resetForm();
          this.itemListForm.reset();
        }
        this.update = false;
      })
    } else {
      this.http.post(this.auth.host + '/insertdocviatable.php?tab=item_list', this.itemListForm.value).subscribe(res => {
        if (res['status'] == true) {
          this.intial();
          formDirective.resetForm();
          this.itemListForm.reset();
        }else {
          this.auth.presentAlert('Alert','','Alredy Exist');
        }
      })
    }
  }

  delete(index) {
    this.http.get(this.auth.host + '/deletedecviatable.php?tab=item_list&id=' + index).subscribe(res => {
      console.log(res);
      this.intial();
    })
  }

  edit(index) {
    // alert(index);
    this.http.get(this.auth.host + '/getsingledocviatable.php?tab=item_list&id=' + index).subscribe(res => {
      console.log(res);
      this.id = res[0].id;
      this.itemListForm = this.formbuider.group({
        'department': new FormControl(res[0].department_id, [Validators.required]),
        'company': new FormControl(res[0].category_id, [Validators.required]),
        'item': new FormControl(res[0].item_id, [Validators.required]),
        'subitem': new FormControl(res[0].subitem, [Validators.required]),
        'price': new FormControl(res[0].price, [Validators.required]),

      })
      this.update = true;
    })
  }
}
