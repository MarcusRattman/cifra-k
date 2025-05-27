import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { User } from '../models';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FetcherService } from '../fetcher/fetcher.service';

@Component({
  selector: 'app-user-card-component',
  imports: [
    NgIf,
    RouterLink,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.less'
})
export class UserCardComponent {
  @Input() userProp: User;

  constructor(private fetcherService: FetcherService) {
    this.userProp = {
      id: 0,
      first_name: "******",
      last_name: "******",
      avatar: "assets/images/placeholder.jpg",
      email: "******",
    }
  }

  delete() {
    if (this.userProp.id != 0) {
      this.fetcherService.deleteUser(this.userProp.id).subscribe({
        next: (val) => this.userProp = val,
        error: () => alert(`Failed to delete user ${this.userProp}`),
      });
    }
  }
}
