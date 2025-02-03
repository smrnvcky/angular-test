import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  imports: [],
  template: `
    <div class="mx-auto px-4 max-w-[1000px] my-5 space-y-10">
      <div>
        <h1 class="text-3xl font-bold mb-4">Пользователи</h1>
        <table class="w-full">
          <tbody>
            @for (user of users(); track user.id) {
            <tr class="border-b border-gray-300">
              <td class="p-2">
                <img
                  [src]="user.avatar"
                  class="size-[60px] rounded-full"
                  [alt]="user.first_name"
                />
              </td>
              <td class="p-2">{{ user.first_name }}</td>
              <td class="p-2">{{ user.last_name }}</td>
              <td class="p-2">{{ user.email }}</td>
              <td class="p-2">
                <a
                  [href]="'/users/' + user.id"
                  class="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded text-white"
                  >Подробнее</a
                >
              </td>
              <td class="p-2">
                <a
                  (click)="deleteUser(user.id)"
                  class="bg-red-500 hover:bg-red-600 px-5 py-2 rounded text-white cursor-pointer"
                  >X</a
                >
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-4">Ресуры</h1>
        <table class="w-full">
          <tbody>
            @for (resource of resources(); track resource.id) {
            <tr class="border-b border-gray-300">
              <td [title]="resource.color" class="p-2">
                <svg height="60" width="60">
                  <circle
                    r="30"
                    cx="30"
                    cy="30"
                    style="fill: {{ resource.color }}"
                  />
                </svg>
              </td>
              <td class="p-2">{{ resource.name }}</td>
              <td class="p-2">{{ resource.pantone_value }}</td>
              <td class="p-2">{{ resource.year }}</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ListComponent implements OnInit {
  http = inject(HttpClient);
  users = signal<any[]>([]);
  resources = signal<any[]>([]);

  ngOnInit(): void {
    this.getUsers();
    this.getResources();
  }

  getUsers() {
    return this.http
      .get('https://reqres.in/api/users?page=2')
      .subscribe((data: any) => {
        this.users.set(data.data);
      });
  }

  getResources() {
    return this.http
      .get('https://reqres.in/api/unknown')
      .subscribe((data: any) => {
        console.log(data.data);
        this.resources.set(data.data);
      });
  }

  deleteUser(userId: number) {
    if (
      confirm(`Вы уверены, что хотите удалить пользователя с ID ${userId}?`)
    ) {
      this.http.delete(`https://reqres.in/api/users/${userId}`).subscribe({
        next: () => {
          this.users.set(this.users().filter((user) => user.id !== userId));
          alert('Удаление прошло успешно!');
        },
        error: () => {
          alert('Произошла ошибка при удалении.');
        },
      });
    }
  }
}
