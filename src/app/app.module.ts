import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MarketComponent } from './market/market.component';
import { TradingHistoryComponent } from './trading-history/trading-history.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksService } from './services/stocks.service';
import { ChartModule } from 'angular-highcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './profile/profile.component';
import { PremiumComponent } from './premium/premium.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthService } from './services/auth.service';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MarketComponent,
    TradingHistoryComponent,
    HomeComponent,
    ProfileComponent,
    PremiumComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule,
    NgxPaginationModule,
    CommonModule,
  ],
  providers: [
    StocksService,
    AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
