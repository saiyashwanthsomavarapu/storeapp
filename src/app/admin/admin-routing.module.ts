import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DepartmentComponent } from './department/department.component';
import { CategoryComponent } from './category/category.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsComponent } from './items/items.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
  },
  {
        path:'department',
        component:DepartmentComponent 
     
  },{
    path:'category',
    component:CategoryComponent
  },
  {
    path:'items',
    component:ItemsComponent
  },
  {
    path:'sub_list',
    component:ItemsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
