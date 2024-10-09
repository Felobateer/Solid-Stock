import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StocksService } from '../services/stocks.service';
import { PurchaseStockService } from '../services/purchase-stock.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  stocks$!: Observable<any[]>;
  stocksNum = 8;
  selectMenu: boolean[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private data: StocksService,
    private purchase: PurchaseStockService
  ) {}

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(TextPlugin);
    this.stocks$ = this.data.fetchStockPrices();
    this.selectMenu.fill(false);
    this.animations();
  }

  addStock(stock: any, type: string) {
    if (this.auth.isLoggedIn()) {
      this.purchase.addSelect(stock, type);
    } else {
      alert('please login first');
      this.router.navigate(['/Login']);
    }
  }

  toggleMenu(index: number) {
    this.selectMenu[index] = !this.selectMenu[index];
  }

  animations() {
    gsap.from('#slogan', {
      text: {
        value: '',
        speed: 0.4,
      },
    });
    gsap.from('.aboutUs div', {
      scrollTrigger: {
        trigger: '.aboutUs',
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
      },
      opacity: 0,
      x: -100,
      stagger: 0.5,
    });
  }
}
