import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'solidStock';
  signIn: boolean = sessionStorage.getItem('logged') === 'false';

  constructor(private router: Router) {}

  onSignIn(value: boolean) {
    console.log(value);
    this.signIn = value;
    sessionStorage.setItem('logged', this.signIn.toString());
  }

  onSignOut() {
    this.signIn = false;
  }
}
