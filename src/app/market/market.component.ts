import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StocksService } from '../services/stocks.service';
import { PurchaseStockService } from '../services/purchase-stock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  stocks$: Observable<any[]> | undefined;
  pageSize = 20;
  currentPage = 1;
  selectMenu: boolean[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private data: StocksService,
    private purchase: PurchaseStockService
  ) {}

  ngOnInit(): void {
    this.stocks$ = this.data.fetchStockPrices();
    this.selectMenu = new Array(this.pageSize).fill(false);
  }

  addStock(stock: any, type: string) {
    if (this.auth.isLoggedIn()) {
      this.purchase.addSelect(stock, type);
    } else {
      alert('please login First');
      this.router.navigate(['/Login']);
    }
  }

  onPageChange(event: any): void {
    this.currentPage = event;
  }

  getPageNumbers(totalItems: number): number[] {
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  toggleMenu(index: number) {
    this.selectMenu[index] = !this.selectMenu[index];
  }
}
