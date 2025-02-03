import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-read',
  imports: [FormsModule],
  templateUrl: './read.component.html',
})
export class ReadComponent {
  userId: number | null = null;
  userData: any = {};

  isLoading = signal(false);

  http = inject(HttpClient);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = Number(params.get('id'));
      this.getUserData();
    });
  }

  getUserData() {
    this.http
      .get(`https://reqres.in/api/users/${this.userId}`)
      .subscribe((res: any) => {
        this.userData = res.data;
      });
  }

  saveChanges() {
    this.isLoading.set(true);
    if (!this.userData) {
      return;
    }

    this.http
      .put(`https://reqres.in/api/users/${this.userId}`, this.userData)
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
