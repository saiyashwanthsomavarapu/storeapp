import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemsComponent } from './items/items.component';
import { ItemsListComponent } from './items-list/items-list.component';



@NgModule({
  declarations: [AdminComponent,DepartmentComponent,CategoryComponent,ItemsComponent,ItemsListComponent],
  imports: [
    IonicModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
