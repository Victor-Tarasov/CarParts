import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Brand} from "../model/brand";
import {CarPart} from "../model/car-part";
import {CarPartsDao} from "./car-parts-dao";

@Injectable()
export class CarPartsDaoService implements CarPartsDao {

  constructor(private http: HttpClient) {
    console.log();
  }

  getBrands() {
    return this.http.get<Brand[]>('http://localhost:8081/carParts/brands');
  }

  getCarParts() {
    return this.http.get<CarPart[]>('http://localhost:8081/carParts');
  }

  saveCarPart(carPart: CarPart) {
    return this.http.post('http://localhost:8081/carParts/add', carPart);
  }
}
