import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserFormListComponent } from './user-form-list/user-form-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    { path: 'register', component: UserRegistrationComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'user-form-list', component: UserFormListComponent },
    { path: 'user-form', component: UserFormComponent },
    { path: 'user-form/:id', component: UserFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Fallback route
];
