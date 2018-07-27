import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Forecast } from '../forecast';
import 'rxjs/Rx';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  
  forecastForm: FormGroup
  cityForecast: Forecast[] = []
  showLoader:boolean = false

  constructor(private weatherService: WeatherService) { }

  

  ngOnInit() {
    this.forecastForm = new FormGroup({
      forecastCity: new FormControl('')
    })
  }

  onSubmit(){
    this.showLoader = true
    this.cityForecast = []
    this.weatherService.fiveDaysForecast(this.forecastForm.value.forecastCity).subscribe(
      (data) => {
        for(let i=0; i< data.list.length; i+=8){
          const temporary = new Forecast(data.list[i].dt_txt,
                                         data.list[i].weather[0].icon,
                                         data.list[i].main.temp_max,
                                         data.list[i].main.temp_min)
          this.cityForecast.push(temporary);
          this.showLoader = false
        }
      }
    );
 
  }

}
