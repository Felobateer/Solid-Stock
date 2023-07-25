import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TradingHistoryComponent } from './trading-history/trading-history.component';
import { MarketComponent } from './market/market.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PremiumComponent } from './premium/premium.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'trades', component: TradingHistoryComponent },
  { path: 'market', component: MarketComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'premium', component: PremiumComponent },
  { path: '**', redirectTo: '/Home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
