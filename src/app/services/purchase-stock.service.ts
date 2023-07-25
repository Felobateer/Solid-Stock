import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseStockService {
  private stockKey = 'stocksList';
  private notificationSubject = new Subject<boolean>();
  notification$ = this.notificationSubject.asObservable();

  constructor() {}

  getStock(): any[] {
    const list = sessionStorage.getItem(this.stockKey);
    return list ? JSON.parse(list) : [];
  }

  addSelect(stock: any, status: string): void {
    const list = this.getStock();
    const stockStatus = { stock, status };
    list.push(stockStatus);
    sessionStorage.setItem(this.stockKey, JSON.stringify(list));
    this.notificationSubject.next(true);
  }

  close(symbol: string): void {
    const list = this.getStock();
    const updatedList = list.filter(
      (stockStatus) => stockStatus.stock.symbol !== symbol
    );
    sessionStorage.setItem(this.stockKey, JSON.stringify(updatedList));
  }
}
