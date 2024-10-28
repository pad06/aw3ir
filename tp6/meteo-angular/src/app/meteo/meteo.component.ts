import { Component, OnInit } from "@angular/core";
import { MeteoItem } from "../meteoItem";

@Component({
  selector: "app-meteo",
  templateUrl: "./meteo.component.html",
  styleUrls: ["./meteo.component.css"],
})
export class MeteoComponent implements OnInit {
  city: MeteoItem = {
    name: "",
    id: 0,
    weather: null,
  };

  cityList: MeteoItem[] = [];

  constructor() {}

  ngOnInit() {
    const storedList = localStorage.getItem("cityList");

    if (storedList !== undefined && storedList !== null) {
      this.cityList = JSON.parse(storedList);
    } else {
      this.cityList = [];
    }
  }

  onSubmit() {
    if (
      this.city.name !== undefined &&
      this.isCityExist(this.city.name) === false
    ) {
      let currentCity = new MeteoItem();
      currentCity.name = this.city.name;
      this.cityList.push(currentCity);

      this.saveCityList();

      console.log(this.city.name, "ajouté à la dans la liste");
    } else {
      console.log(this.city.name, "existe déjà dans la liste");
    }
  }

  remove(_city: MeteoItem) {
    // on utilise 'filter' pour retourne une liste avec tous les items ayant un nom différent de _city.name
    this.cityList = this.cityList.filter(
      (item: MeteoItem) => item.name != _city.name
    );
    this.saveCityList();
  }

  isCityExist(_cityName: string) {
    // la méthode 'filter' retourne une liste contenant tous les items ayant un nom égale à _cityName
    // doc. sur filter : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/filter
    if (
      this.cityList.filter(
        (item: MeteoItem) => item.name?.toUpperCase() == _cityName.toUpperCase()
      ).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  saveCityList() {
    localStorage.setItem("cityList", JSON.stringify(this.cityList));
  }
}