import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  catForm:FormGroup;
  categories:any;
  update:boolean = false;
  id:any;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,public auth:AuthService) { }

  ngOnInit() {
    this.catForm = this.formbuilder.group({
      'cat_name':new FormControl('',[Validators.required])
    })
    this.intial();
  }

  intial(){
    this.http.get(this.auth.host+"/getdataviatable.php?tab=cat").subscribe(res=>{
      console.log(res);
      this.categories =res;
    })
  }

  addCategory(formDirective,index){
    console.log()
    if (this.update) {
      this.http.post(this.auth.host+'/updatedocviatable.php?tab=cat&id='+index, this.catForm.value).subscribe(res => {
        if (res['status'] == true) {
          this.intial();
          formDirective.resetForm();
          this.catForm.reset();
        }
        this.update = false
      });
    } else{
    this.http.post(this.auth.host+'/insertdocviatable.php?tab=cat',this.catForm.value).subscribe(res=>{
      if(res['status']==true){
        this.intial();
        formDirective.resetForm();
        this.catForm.reset();
      } else {
        this.auth.presentAlert('Alert','','Alredy Exist');
      }
    })
  }
  }

  delete(index){
    this.http.get(this.auth.host+'/deletedecviatable.php?tab=cat&id='+index).subscribe(res=>{
      console.log(res);
      this.intial();
    })
  }
  edit(index) {
    // alert(index);
    this.http.get(this.auth.host + '/getsingledocviatable.php?tab=cat&id=' + index).subscribe(res => {
      console.log(res);
      this.id = res[0].id;
      this.catForm = this.formbuilder.group({
        "cat_name": new FormControl(res[0].cat_name, [Validators.required])
      })
      this.update = true;
    })
  }

}
