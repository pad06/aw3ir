import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MeteoService } from "../services/meteo.service";
@Component({
  selector: "app-meteo-detail",
  templateUrl: "./meteo-detail.component.html",
  styleUrls: ["./meteo-detail.component.css"],
})
export class MeteoDetailComponent implements OnInit {
  meteo: any;
  latlon: string = "";
  fiveDayForecast: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService
  ) { }
  ngOnInit() {
    this.getMeteo();
    this.getFiveDayForecast();
  }
  getMeteo(): void {
    const name = this.route.snapshot.paramMap.get("name");
    if (name) {
      this.meteoService
        .getMeteo(name)
        .then((response) => {
          this.meteo = response;
          this.latlon = `${this.meteo.coord.lat},${this.meteo.coord.lon}`;
        })
        .catch((fail) => (this.meteo = fail));
    }
  }
  getFiveDayForecast(): void {
    const name = this.route.snapshot.paramMap.get("name");
    if (name) {
      this.meteoService
        .getFiveDayForecast(name)
        .then((response) => {
          // Filtrer pour obtenir une prévision par jour à midi
          this.fiveDayForecast = response.list.filter((item: any) =>
            item.dt_txt.includes("12:00:00")
          );
        })
        .catch((error) =>
          console.error(
            "Erreur lors de la récupération des prévisions sur 5 jours :",
            error
          )
        );
    }
  }
}