import {Brand} from "../model/brand";
import {CarPart} from "../model/car-part";
import {Observable} from "rxjs/Observable";
import {InjectionToken} from "@angular/core";

export const CAR_PARTS_DAO_SERVICE = new InjectionToken<CarPartsDao>('CarPartsDao');

export interface CarPartsDao {
  getBrands(): Observable<Brand[]>;

  getCarParts(): Observable<CarPart[]>;

  saveCarPart(carPart: CarPart): Observable<any>;
}
