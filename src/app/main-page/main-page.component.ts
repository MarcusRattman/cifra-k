import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserCardComponent } from '../user-card/user-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FetcherService } from '../fetcher/fetcher.service';
import { Observable } from 'rxjs';
import { ResourcesResponse, UsersResponse } from '../models';
import { ResorceCardComponent } from "../resorce-card/resorce-card.component";

@Component({
  selector: 'app-main-page',
  imports: [
    NgFor,
    NgIf,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    UserCardComponent,
    MatPaginatorModule,
    MatProgressBarModule,
    ResorceCardComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.less'
})
export class MainPageComponent {
  usersResponse$!: Observable<UsersResponse>;
  resourcesResponse$!: Observable<ResourcesResponse>;
  usersResponse!: UsersResponse;
  resourcesResponse!: ResourcesResponse;
  loading = false;

  constructor(private fetcherService: FetcherService) { }

  private fetchUsersPage(page: number) {
    this.loading = true;
    this.usersResponse$ = this.fetcherService.getUsers(page);
    this.usersResponse$.subscribe(resp => {
      this.usersResponse = resp;
      this.loading = false;
    });
  }

  private fetchResourcesPage(page: number) {
    this.loading = true;
    this.resourcesResponse$ = this.fetcherService.getResources(page);
    this.resourcesResponse$.subscribe(resp => {
      this.resourcesResponse = resp;
      this.loading = false;
    });
  }

  ngOnInit() {
    this.fetchUsersPage(1);
    this.fetchResourcesPage(1);
  }

  prevUsers() {
    let current_page = this.usersResponse.page;

    if (current_page > 1) {
      this.fetchUsersPage(current_page - 1);
    }
  }

  nextUsers() {
    let current_page = this.usersResponse.page;

    if (current_page < this.usersResponse.total_pages) {
      this.fetchUsersPage(current_page + 1);
    }
  }

  prevRes() {
    let current_page = this.resourcesResponse.page;

    if (current_page > 1) {
      this.fetchResourcesPage(current_page - 1);
    }
  }

  nextRes() {
    let current_page = this.resourcesResponse.page;

    if (current_page < this.usersResponse.total_pages) {
      this.fetchResourcesPage(current_page + 1);
    }
  }
}
