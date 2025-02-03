import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-read',
  imports: [ReactiveFormsModule],
  template: `<div class="max-w-[600px] px-5 mx-auto space-y-5 py-5">
    <a class="inline-block bg-blue-600 rounded px-4 py-2 text-white" href="../"
      >Вернуться назад</a
    >
    <h1 class="font-bold text-3xl">Редактировать пользователя</h1>
    <form
      [formGroup]="form"
      (ngSubmit)="saveChanges()"
      class="flex flex-col gap-5"
    >
      <div>
        <img [src]="avatar()" class="size-[60px] rounded-full" />
      </div>
      <div class="flex flex-col">
        <label for="first-name">Имя</label>
        <input
          class="border border-gray-300 rounded px-4 py-2"
          id="first-name"
          type="text"
          formControlName="firstName"
          name="firstName"
        />
      </div>
      <div class="flex flex-col">
        <label for="last-name">Фамилия</label>
        <input
          class="border border-gray-300 rounded px-4 py-2"
          id="last-name"
          type="text"
          formControlName="lastName"
          name="lastName"
        />
      </div>
      <div class="flex flex-col">
        <label for="email">Почта</label>
        <input
          class="border border-gray-300 rounded px-4 py-2"
          id="email"
          type="text"
          formControlName="email"
          name="email"
        />
      </div>
      <button
        class="cursor-pointer bg-blue-600 px-4 py-2 text-white rounded disabled:bg-gray-600"
        type="submit"
        [disabled]="isLoading()"
      >
        Сохранить
      </button>
    </form>
  </div> `,
})
export class ReadComponent {
  userId = signal('');
  avatar = signal('');

  form = new FormGroup({
    id: new FormControl(''),
    avatar: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  isLoading = signal(false);
  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId.set(params.get('id') ?? '');
      this.getUserData();
    });
  }

  getUserData() {
    this.http
      .get<{
        data: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          avatar: string;
        };
      }>(`https://reqres.in/api/users/${this.userId()}`)
      .subscribe((res) => {
        console.log('Полученный ответ:', res);
        this.form.setValue({
          id: res.data.id,
          avatar: res.data.avatar,
          email: res.data.email,
          firstName: res.data.first_name,
          lastName: res.data.last_name,
        });
        this.avatar.set(res.data.avatar);
      });
  }

  saveChanges() {
    this.isLoading.set(true);
    this.http
      .put(`https://reqres.in/api/users/${this.userId}`, this.form.value)
      .subscribe({
        next: () => {
          alert('Изменения сохранены!');
          this.isLoading.set(false);
        },
        error: () => {
          alert('Произошла ошибка!');
          this.isLoading.set(false);
        },
      });
  }
}
