import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: `
    <div class="max-w-[600px] mx-auto space-y-5 py-5">
      <h1 class="font-bold text-3xl">Вход</h1>
      <form class="space-y-3" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div>
          <label for="email">Email:</label><br />
          <input
            class="border border-gray-300 rounded px-4 py-2"
            type="email"
            id="email"
            name="email"
            formControlName="email"
            required
          />
        </div>
        <div>
          <label for="password">Пароль:</label><br />
          <input
            class="border border-gray-300 rounded px-4 py-2"
            type="password"
            id="password"
            name="password"
            formControlName="password"
            required
          />
        </div>
        <button
          class="disabled:bg-gray-600 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 rounded transition-all cursor-pointer px-4 py-2 text-white"
          type="submit"
          [disabled]="isLoading()"
        >
          Войти
        </button>
        <div class="text-red-600">
          {{ errorMessage() }}
        </div>
      </form>
      <div>
        <p>Данные для входа</p>
        <p>Логин: janet.weaver&commat;reqres.in</p>
        <p>Пароль любой</p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  errorMessage = signal('');
  isLoading = signal(false);
  cookieService = inject(CookieService);
  http = inject(HttpClient);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.isLoading.set(true);
    const credentials = this.loginForm.value;

    return this.http.post('https://reqres.in/api/login', credentials).subscribe(
      (response: any) => {
        this.cookieService.set('token', response.token, 1);
        this.router.navigate(['/users']);
      },
      (error) => {
        this.errorMessage.set(error.error.error);
        this.isLoading.set(false);
      }
    );
  }
}
