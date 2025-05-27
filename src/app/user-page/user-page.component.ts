import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetcherService } from '../fetcher/fetcher.service';
import { User } from '../models';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  imports: [
    NgIf,
    AsyncPipe,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.less'
})
export class UserPageComponent {
  user$!: Observable<User>;
  user!: User;
  myForm!: FormGroup;
  private readonly fetcherService = inject(FetcherService);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  constructor(private router: Router) {
    this.myForm = this.fb.group({
      first_name: [``],
      last_name: [``],
      email: [``],
    })
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.user = {
        ...this.user,
        ...this.myForm.value,
      }

      this.user$ = this.fetcherService.putUser(this.user);
      this.user$.subscribe(() => this.router.navigate(['']));
    }
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id")!;

    this.user$ = this.fetcherService.getUser(parseInt(id));
    this.user$.subscribe({
      next: (user) => {
        this.user = user;
        this.myForm = this.fb.group({
          first_name: [user.first_name, Validators.required],
          last_name: [user.last_name, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
        });
      },
      error: (e: HttpErrorResponse) => {
        alert(`${e.message}`);
        this.router.navigate(['']);
      },
    });
  }
}
