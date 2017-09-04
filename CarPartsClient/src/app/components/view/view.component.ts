import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Brand} from "../../model/brand";
import {CarPart} from "../../model/car-part";
import {CAR_PARTS_DAO_SERVICE, CarPartsDao} from "../../services/car-parts-dao";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  private modelsIdBrandsMap: Map<number, Brand> = new Map();
  carParts: CarPart[];
  carPart: CarPart;

  @ViewChild("partDetails")
  partDetails: ElementRef;

  constructor(@Inject(CAR_PARTS_DAO_SERVICE) private carPartsDao: CarPartsDao, private router: Router) {
    this.loadModelsAndBrands();
    this.carPartsDao.getCarParts().subscribe(carParts => {
      this.carParts = carParts;
    });
  }

  private loadModelsAndBrands() {
    this.carPartsDao.getBrands().subscribe(brands => {
      for (let brand of brands) {
        for (let model of brand.models) {
          this.modelsIdBrandsMap.set(model.id, brand);
        }
      }
    });
  }

  navigateToInsert() {
    this.router.navigate([""]);
  }

  findBrandName(carPart: CarPart): string {
    if (!carPart) return "";

    return this.modelsIdBrandsMap.get(carPart.model.id).name;
  }

  showCarPartDetails(carPart: CarPart) {
    this.carPart = carPart;
    this.partDetails.nativeElement.hidden = false;
  }

  closePartDetails() {
    this.partDetails.nativeElement.hidden = true;
  }
}
