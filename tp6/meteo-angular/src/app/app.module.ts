import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'; // Ajoutez HttpClientModule pour les appels HTTP
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { MeteoComponent } from "./meteo/meteo.component";
import { MeteoDetailComponent } from "./meteo-detail/meteo-detail.component";
import { MeteoService } from './meteo.service';

const appRoutes: Routes = [
  { path: "", component: MeteoComponent },
  { path: "meteo/:name", component: MeteoDetailComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" },
];

@NgModule({
  declarations: [
    AppComponent,
    MeteoComponent,
    MeteoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MeteoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
