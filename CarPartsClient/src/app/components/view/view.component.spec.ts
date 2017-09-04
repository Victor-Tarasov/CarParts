'use strict';

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewComponent} from './view.component';
import 'rxjs/add/observable/of';
import {MockCarPartsDaoService} from "../../services/mock-car-parts-dao.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CAR_PARTS_DAO_SERVICE} from "../../services/car-parts-dao";
import {CarPart} from "../../model/car-part";
import {Brand} from "../../model/brand";

describe('ViewComponent', () => {
  let fixture: ComponentFixture<ViewComponent>;
  let viewComponent: ViewComponent;
  let nativeElement: HTMLElement;
  let mockCarPartsDaoService: MockCarPartsDaoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ViewComponent],
      providers: [{provide: CAR_PARTS_DAO_SERVICE, useClass: MockCarPartsDaoService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    viewComponent = fixture.componentInstance;
    mockCarPartsDaoService = <MockCarPartsDaoService> fixture.debugElement.injector.get(CAR_PARTS_DAO_SERVICE);
    nativeElement = fixture.nativeElement;
  });

  let expectPageContains = function (expected: string) {
    expect(nativeElement.textContent).toContain(expected);
  };

  it('table should contain all car parts', () => {
    fixture.detectChanges();
    for (let carPart of mockCarPartsDaoService.carParts) {
      expectPageContains(carPart.partCode);
      expectPageContains(carPart.name);
    }
  });

  it('should display car part details', () => {
      let carPart = mockCarPartsDaoService.carParts[0];
      viewComponent.showCarPartDetails(carPart);
      fixture.detectChanges();
      expectPageContains(carPart.description);
      expectPageContains(carPart.model.name);
      expectPageContains(viewComponent.findBrandName(carPart));
  });

  it('should find brand name', () => {
      let brand: Brand = mockCarPartsDaoService.brands[0];
      let carPart: CarPart = {
        partCode: "code",
        name: "name",
        model: brand.models[0],
        description: "description"
      };
      expect(viewComponent.findBrandName(carPart)).toEqual(brand.name);
    })
});
