import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from 'src/app/current-weather';
import { ActivatedRoute } from '@angular/router';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  weather: CurrentWeather;
  showLoader:boolean = true

  constructor(private weatherService: WeatherService, private route:ActivatedRoute) {
   }

  ngOnInit() {
    this.route.data.subscribe(
      (data:{current : CurrentWeather }) => {
        this.weather = data.current
        this.showLoader = false;
      }
    )
  }

  onSubmit(weatherForm: NgForm){
    this.showloader = true
    this.weatherService.newCityWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.weather = new CurrentWeather(data.name,
                        data.main.temp,
                        data.weather[0].icon,
                        data.weather[0].description,
                        data.main.temp_max,
                        data.main.temp_min);
      this.showloader = false;
      }
    )
  }

}
