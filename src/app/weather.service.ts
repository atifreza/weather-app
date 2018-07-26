import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import { Forecast } from './forecast';

@Injectable()
export class WeatherService {
  current: CurrentWeather;
  location
  forecast: Forecast
  constructor(private http: Http) { }

  localWeather(){
    return new Promise((res,rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f45dbb19a7e50314ce8d189ad6ed44cb&units=imperial`).map((response: Response) =>
         response.json()).toPromise().then((data) => {
           console.log('weather',data)
           this.current = new CurrentWeather(data.name,
                                            data.main.temp,
                                            data.weather[0].icon,
                                            data.weather[0].description,
                                            data.main.temp_max,
                                            data.main.temp_min);
            console.log('name',this.current)
            res(this.current);
         });

      })
    })
  }

  newCityWeather(city: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f45dbb19a7e50314ce8d189ad6ed44cb&units=imperial`)
                        .map((response: Response) => response.json());
  }

  fiveDaysForecast(city: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f45dbb19a7e50314ce8d189ad6ed44cb&units=imperial`)
                        .map((response: Response) => response.json());
  }
}
