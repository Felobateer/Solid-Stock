import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PurchaseStockService } from '../services/purchase-stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isOpen = false;
  isOpenMobile = false;
  notifications = false;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private stockNotification: PurchaseStockService
  ) {
    this.subscription = this.stockNotification.notification$.subscribe(
      (value: boolean) => {
        this.notifications = value;
      }
    );
  }

  ngOnInit(): void {}

  getNotes() {
    return this.stockNotification.getStock();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    this.isOpenMobile = false;
  }

  toggleDropdownMobile() {
    this.isOpenMobile = !this.isOpenMobile;
    this.isOpen = false;
  }

  isRouteActive(routePath: string): boolean {
    return this.router.isActive(routePath, true);
  }

  onSignOut() {
    this.auth.logout();
  }

  get signIn(): boolean {
    return this.auth.isLoggedIn();
  }

  showNotifications() {
    this.notifications = !this.notifications;
  }
}
