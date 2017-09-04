import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InsertComponent } from './insert/insert.component';
import {HttpClientModule} from "@angular/common/http";
import {CarPartsDaoService} from "../services/car-parts-dao.service";
import {RouterModule, Routes} from "@angular/router";
import {ViewComponent} from "app/components/view/view.component";
import {CAR_PARTS_DAO_SERVICE, CarPartsDao} from "../services/car-parts-dao";

const appRoutes: Routes = [
  {path: 'view', component: ViewComponent},
  {path: '**', component: InsertComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    InsertComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: CAR_PARTS_DAO_SERVICE, useClass: CarPartsDaoService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
