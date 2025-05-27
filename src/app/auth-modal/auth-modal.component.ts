import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { AuthRequest } from '../models';
import { AuthService } from '../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-modal',
  imports: [
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.less'
})
export class AuthModalComponent {
  authRequest: AuthRequest = { email: '', password: '' };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AuthModalComponent>) { }

  submit() {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.authRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close({ email: this.authRequest.email, token: response });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }

  signUp() {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.register(this.authRequest).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.dialogRef.close({ email: this.authRequest.email, token: response });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Check your credentials.';
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
