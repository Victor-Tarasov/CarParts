import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {InsertComponent} from './insert.component';
import {FormsModule} from "@angular/forms";
import {MockCarPartsDaoService} from "../../services/mock-car-parts-dao.service";
import {CAR_PARTS_DAO_SERVICE} from "../../services/car-parts-dao";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {CarPart} from "../../model/car-part";

describe('InsertComponent', () => {
  let insertComponent: InsertComponent;
  let fixture: ComponentFixture<InsertComponent>;
  let mockCarPartsDaoService: MockCarPartsDaoService;
  let nativeElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [InsertComponent],
      providers: [{provide: CAR_PARTS_DAO_SERVICE, useClass: MockCarPartsDaoService}]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InsertComponent);
    fixture.detectChanges();
    insertComponent = fixture.componentInstance;
    mockCarPartsDaoService = <MockCarPartsDaoService> fixture.debugElement.injector.get(CAR_PARTS_DAO_SERVICE);
    nativeElement = fixture.debugElement.nativeElement;
  }));

  let expectPageContains = function (expected: string) {
    expect(nativeElement.textContent).toContain(expected);
  };


  it('should contains all brands', () => {
    for (let brand of mockCarPartsDaoService.brands) {
      expectPageContains(brand.name);
    }
  });

  it('should contains all models of the brand', () => {
    let brand = mockCarPartsDaoService.brands[0];
    insertComponent.brandSelected(brand.id.toString());
    fixture.detectChanges();
    for (let model of brand.models) {
      expectPageContains(model.name);
    }
  });


  let getElementBySelector = function (id: string) {
    return fixture.debugElement.query(By.css(id)).nativeElement;
  };

  let setValue = function (selector: string, value: string, event: string) {
    let element = getElementBySelector(selector);
    element.value = value;
    element.dispatchEvent(new Event(event));
    fixture.detectChanges();
  };

  it('should save part', fakeAsync(() => {
    let brand = mockCarPartsDaoService.brands[1];
    let carPart: CarPart = {
      name: "somename",
      partCode: "somecode",
      description: "somedescription",
      model: brand.models[0]
    };
    console.log(insertComponent);

    setValue("#name", carPart.name, 'input');
    setValue("#code", carPart.partCode, 'input');
    setValue("#description", carPart.description, 'input');
    setValue("#brand", brand.id.toString(), 'change');
    setValue("#model", carPart.model.id.toString(), 'change');
    fixture.debugElement.query(By.css("#carPartForm")).triggerEventHandler('submit', null);
    expect(mockCarPartsDaoService.carParts.map(carPart => JSON.stringify(carPart)))
      .toContain( JSON.stringify(carPart));
  }));
});
