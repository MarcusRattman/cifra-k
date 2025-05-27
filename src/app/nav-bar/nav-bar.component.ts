import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [
    NgIf,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.less'
})
export class NavBarComponent {
  isAuthenticated: boolean;
  email: string;

  constructor(private dialog: MatDialog) {
    this.isAuthenticated = localStorage.getItem("token") != null;
    this.email = localStorage.getItem("email") || "";
  };

  ngOnInit() { }

  login() {
    const dialogRef = this.dialog.open(AuthModalComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.email = result.email;
        localStorage.setItem("token", result.token);
        localStorage.setItem("email", result.email);
        this.isAuthenticated = true;
        alert(`Logged in as ${this.email}`);
      }
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.isAuthenticated = false;
    alert(`Logged out of ${this.email}`);
  }
}
