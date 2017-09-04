import {Injectable} from '@angular/core';
import {CarPart} from "../model/car-part";
import {CarPartsDao} from "./car-parts-dao";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class MockCarPartsDaoService implements CarPartsDao {

  brands = [
    {
      id: 1,
      name: 'Volvo',
      models: [
        {
          id: 1,
          name: 'V40'
        }, {
          id: 2,
          name: 'S60'
        }
      ]
    }, {
      id: 2,
      name: 'Folcvagen',
      models: [
        {
          id: 3,
          name: 'Jetta'
        }, {
          id: 4,
          name: 'Passat'
        }
      ]
    }
  ];

  carParts = [{
    partCode: 'code1',
    name: 'name1',
    description: 'description1',
    model: this.brands[0].models[0]
  }, {
    partCode: 'code2',
    name: 'name2',
    description: 'description2',
    model: this.brands[1].models[0]
  }, {
    partCode: 'code1',
    name: 'name1',
    description: 'description1',
    model: this.brands[0].models[1]
  }];

  getBrands() {
    return Observable.of(this.brands);
  }

  getCarParts() {
    return Observable.of(this.carParts);
  }

  saveCarPart(carPart: CarPart) {
    this.carParts.push(carPart);
    return Observable.of(null);
  }
}
