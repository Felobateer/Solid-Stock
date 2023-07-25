import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, timer } from 'rxjs';
import { catchError, map, concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  stockSymbols: string[] = [
    'AAPL',
    'GOOGL',
    'MSFT',
    'AMZN',
    'TSLA',
    'NVDA',
    'JPM',
    'V',
    'WMT',
    'JNJ',
    'PG',
    'UNH',
    'BAC',
    'HD',
    'INTC',
    'VZ',
    'DIS',
    'MA',
    'ADBE',
    'CMCSA',
    'KO',
    'NFLX',
    'PYPL',
    'PEP',
    'T',
    'NVAX',
    'MRNA',
    'ZM',
    'XOM',
    'CSCO',
    'CRM',
    'ABBV',
    'NKE',
    'IBM',
    'LMT',
    'COST',
    'ABT',
    'AMGN',
    'CVX',
    'PFE',
    'CVS',
    'GILD',
    'BMY',
    'MDT',
    'DHR',
    'UNP',
    'MMM',
    'SBUX',
    'AMT',
    'LRCX',
    'ADP',
    'INTU',
    'NOW',
    'GS',
    'MO',
    'SPG',
    'TGT',
  ];

  constructor(private http: HttpClient) {}

  fetchStockPrices(): Observable<any[]> {
    const cachedData = this.getCachedData();

    if (cachedData) {
      return of(cachedData);
    }

    const api_key = 'cir4dhpr01qjff7d13ngcir4dhpr01qjff7d13o0';
    const stockUrls = this.stockSymbols.map((symbol) => ({
      symbol,
      quoteUrl: `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${api_key}`,
      companyUrl: `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${api_key}`,
    }));

    return forkJoin(
      stockUrls.map(({ quoteUrl, companyUrl }, index) => {
        const delayTime = 0; // Adjust the delay time (in milliseconds) as needed

        return timer(delayTime).pipe(
          concatMap(() => {
            return forkJoin([
              this.http.get<any>(quoteUrl),
              this.http.get<any>(companyUrl),
            ]).pipe(
              map(([quoteData, companyData]: [any, any]) => {
                const priceChange = quoteData.c - quoteData.pc;
                const prev = quoteData.l;
                const priceClass =
                  priceChange > 0
                    ? 'increase'
                    : priceChange < 0
                    ? 'decrease'
                    : '';

                return {
                  symbol: companyData.ticker,
                  description: companyData.name,
                  price: quoteData.c,
                  previousPrice: quoteData.pc,
                  prev2Price: quoteData.o,
                  prev3Price: prev,
                  prev4Price: quoteData.h,
                  pic: companyData.logo,
                  type: companyData.finnhubIndustry,
                  priceClass,
                };
              }),
              catchError((error) => {
                console.error(`Error fetching stock data: ${error}`);
                return of([]);
              })
            );
          })
        );
      })
    ).pipe(
      tap((stocks: any[]) => {
        // Cache the data in local storage
        sessionStorage.setItem('stockData', JSON.stringify(stocks));
      })
    );
  }

  private getCachedData(): any[] | null {
    const cachedData = sessionStorage.getItem('stockData');
    return cachedData ? JSON.parse(cachedData) : null;
  }
}
