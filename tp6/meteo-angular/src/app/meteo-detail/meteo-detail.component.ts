import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.component.html',
  styleUrls: ['./meteo-detail.component.css']
})
export class MeteoDetailComponent implements OnInit {
  cityName: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the 'name' parameter from the route
    this.cityName = this.route.snapshot.paramMap.get('name');
  }
}
