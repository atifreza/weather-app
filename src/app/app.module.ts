import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { weatherRouting } from './weather.routing';
import { WeatherService } from 'src/app/weather.service';
import { WeatherComponent } from './weather/weather.component';
import { ResolveLocationService } from 'src/app/resolve-location.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentComponent,
    ForecastComponent,
    WeatherComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule ,
    weatherRouting,
    ReactiveFormsModule
  ],
  providers: [WeatherService,ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
