import { Routes } from '@angular/router';
import { ReadComponent } from './read/read.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: ListComponent, canActivate: [authGuard] },
    { path: 'users/:id', component: ReadComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
    { path: '**', component: PageNotFoundComponent },
];
