import { Routes } from '@angular/router';
import { UserPageComponent } from './user-page/user-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
    { path: "", component: MainPageComponent, title: "Main Page" },
    { path: "user/:id", component: UserPageComponent, title: "User" },
    { path: "**", redirectTo: '', pathMatch: 'full' },
];
