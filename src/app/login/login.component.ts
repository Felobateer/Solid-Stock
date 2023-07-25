import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  @Output() signingin: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      email: [
        'investor@solid-stock.com',
        [Validators.required, Validators.email],
      ],
      passwords: ['1,000,000$', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  handleLogin() {
    if (this.form.valid) {
      this.auth.login();
      this.router.navigate(['/home']);
    } else {
      alert('Invalid email address or password. Please try again.');
    }
  }
}
