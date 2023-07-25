import { Component, OnInit } from '@angular/core';
import { PurchaseStockService } from '../services/purchase-stock.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-trading-history',
  templateUrl: './trading-history.component.html',
  styleUrls: ['./trading-history.component.scss'],
})
export class TradingHistoryComponent implements OnInit {
  public stocks: any[] = [];
  selectedStock: any = null;
  stockGraph: Chart = new Chart();
  todayDate!: string;
  yesterdayDate!: string;
  dayBeforeYesterdayDate!: string;
  dayBeforeThatDate!: string;

  constructor(private purchase: PurchaseStockService) {}

  ngOnInit(): void {}

  getSelect() {
    return this.purchase.getStock();
  }

  onStockClicked(stock: any) {
    this.selectedStock = stock;
    this.stockGraph = new Chart({
      chart: {
        type: 'line',
        backgroundColor: 'black', // Set the background color of the chart
      },
      title: {
        text: this.selectedStock
          ? this.selectedStock.stock.description
          : 'No Stock Selected',
        style: {
          color: 'white', // Set the text color of the title
        },
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            color: 'white', // Set the text color of the xAxis labels
          },
        },
      },
      yAxis: {
        title: {
          text: 'Price',
          style: {
            color: 'white', // Set the text color of the yAxis title
          },
        },
        labels: {
          style: {
            color: 'white', // Set the text color of the yAxis labels
          },
        },
      },
      plotOptions: {
        line: {
          color: '#7cb5ec', // Set the line color to purple
          marker: {
            radius: 2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      series: [
        {
          type: 'line',
          name: this.selectedStock
            ? this.selectedStock.stock.description
            : 'No Stock Selected',
          data: this.selectedStock
            ? [
                [
                  Date.now() - 3 * 24 * 60 * 60 * 1000,
                  this.selectedStock.stock.prev4Price,
                ],
                [
                  Date.now() - 2 * 24 * 60 * 60 * 1000,
                  this.selectedStock.stock.prev3Price,
                ],
                [
                  Date.now() - 24 * 60 * 60 * 1000,
                  this.selectedStock.stock.previousPrice,
                ],
                [Date.now(), this.selectedStock.stock.price],
              ]
            : [],
          color: '#7cb5ec', // Set the line color to purple
        },
      ],
    });
  }

  handleClose(stock: any) {
    this.purchase.close(stock);
  }
}
