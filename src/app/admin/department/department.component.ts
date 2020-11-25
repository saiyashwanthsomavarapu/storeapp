import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {

  departForm:FormGroup
  // de:any;
  departments:any;
  userForm: FormGroup;
  id:any;
  update:boolean=false;
  constructor(private formbuilder:FormBuilder,private http:HttpClient,public auth:AuthService) { }

  ngOnInit() {
    this.departForm = this.formbuilder.group({
      'department_name':new FormControl('',[Validators.required])
    })
    this.intial()

  }

  intial(){
    this.http.get(this.auth.host+"/getdataviatable.php?tab=depart").subscribe(res=>{
      console.log(res);
      this.departments =res;
    })
  }

  addDepartment(formDirective,index){
    // console.log()
    if(this.update) {
      this.http.post(this.auth.host+'/updatedocviatable.php?tab=depart&id='+index,this.departForm.value).subscribe(res=>{
        if(res['status']==true){
          this.intial();
          formDirective.resetForm();
          this.departForm.reset();
        }
        this.update =false;
      })
    } else {
      console.log(this.departForm.value);
      this.http.post(this.auth.host+'/insertdocviatable.php?tab=depart',this.departForm.value).subscribe(res=>{
       
      console.log(res);
      if(res['status']==true){
          this.intial();
          formDirective.resetForm();
          this.departForm.reset();
        }else {
          this.auth.presentAlert('Alert','','Alredy Exist');
        }
      })
    }

  }

  delete(index){
    this.http.get(this.auth.host+'/deletedecviatable.php?tab=depart&id='+index).subscribe(res=>{
      console.log(res);
      this.intial();
    })
  }

  edit(index) {
    // alert(index);
    this.http.get(this.auth.host + '/getsingledocviatable.php?tab=depart&id=' + index).subscribe(res => {
      console.log(res);
      this.id = res[0].id;
      this.departForm = this.formbuilder.group({
        'department_name':new FormControl(res[0].department_name,[Validators.required])
      })
      this.update = true;
    })
  }
}
