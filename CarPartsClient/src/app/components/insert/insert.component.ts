import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Brand} from "../../model/brand";
import {CarModel} from "../../model/car-model";
import {CarPart} from "../../model/car-part";
import {Router} from "@angular/router";
import {CAR_PARTS_DAO_SERVICE, CarPartsDao} from "../../services/car-parts-dao";

@Component({
  selector: 'insert-car-part',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class InsertComponent {
  private brandsMap: Map<number, Brand>;
  private modelsMap: Map<number, CarModel>;
  private carPart: CarPart = new CarPart();

  @ViewChild('brand_select')
  brandSelect: ElementRef;

  @ViewChild('model_select')
  modelSelect: ElementRef;

  @ViewChild('success_notification')
  successNotification: ElementRef;

  @ViewChild('error_notification')
  errorNotification: ElementRef;

  submitting: boolean = false;


  constructor(@Inject(CAR_PARTS_DAO_SERVICE) private carPartsDao: CarPartsDao, private router: Router) {
    this.carPartsDao.getBrands().subscribe(brands => {
        this.brandsMap = new Map(brands.map<[number, Brand]>((brand) => [brand.id, brand]));
      }
    );
  }

  public getBrands() {
    if (!this.brandsMap) return [];

    return Array.from(this.brandsMap.values());
  }

  public getModels() {
    if (!this.modelsMap) return [];

    return Array.from(this.modelsMap.values());
  }

  brandSelected(brandId: string) {
    let modelsArray = this.brandsMap.get(parseInt(brandId)).models;
    this.modelsMap = new Map(modelsArray.map<[number, CarModel]>((model) => [model.id, model]));
    this.resetDropDown(this.modelSelect);
  }

  modelSelected(modelId: string) {
    this.carPart.model = this.modelsMap.get(parseInt(modelId));
  }

  onSubmit() {
    this.submitting = true;
    this.carPartsDao.saveCarPart(this.carPart).subscribe(data => {
      this.submitting = false;
      this.successNotification.nativeElement.hidden = false;
    }, error => {
      this.submitting = false;
      this.errorNotification.nativeElement.hidden = false;
    })
    this.carPart = new CarPart();
    this.resetDropDown(this.modelSelect);
    this.resetDropDown(this.brandSelect);
  }

  private resetDropDown(dropDown: ElementRef) {
    dropDown.nativeElement.selectedIndex = 0;
  }

  onClick(event) {
    this.successNotification.nativeElement.hidden = true;
    this.errorNotification.nativeElement.hidden = true;
  }

  navigateToView() {
    this.router.navigate(["view"]);
  }
}
