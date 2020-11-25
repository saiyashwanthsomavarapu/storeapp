import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { HomePageRoutingModule } from './home-routing.module';
import { DepartmentComponent } from './department/department.component';
import { ItemsComponent } from './items/items.component';
import { CategoryComponent } from './category/category.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage,DepartmentComponent,ItemsComponent,CategoryComponent],
  entryComponents:[ItemsComponent]
})
export class HomePageModule {}
