import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersResponse, UserResponse, User, ResourcesResponse } from '../models/'
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {
  private headers: HttpHeaders;

  private usersCache: Map<number, UsersResponse> = new Map();
  private userCache: Map<number, User> = new Map();
  private resourcesCache: Map<number, ResourcesResponse> = new Map();

  constructor(private httpService: HttpClient) {
    this.headers = new HttpHeaders().set("x-api-key", "reqres-free-v1");
  }

  getUsers(page: number): Observable<UsersResponse> {
    let page_cached = this.usersCache.has(page);
    if (page_cached) {
      return of(this.usersCache.get(page)!);
    }

    let users$ = this.httpService
      .get<UsersResponse>(
        `https://reqres.in/api/users/?page=${page}`, {
        headers: this.headers,
      }).pipe(
        map(response => {
          this.usersCache.set(page, response);
          return response;
        }));

    return users$;
  }

  getUser(userId: number): Observable<User> {
    let userCached = this.userCache.has(userId);
    if (userCached) {
      return of(this.userCache.get(userId)!);
    }

    let user$ = this.httpService
      .get<UserResponse>(
        `https://reqres.in/api/users/${userId}`,
        { headers: this.headers })
      .pipe(
        map(response => {
          this.userCache.set(userId, response.data);
          return response.data
        }));

    return user$;
  }

  getResources(page: number): Observable<ResourcesResponse> {
    let resourcesCached = this.resourcesCache.has(page);
    if (resourcesCached) {
      return of(this.resourcesCache.get(page)!);
    }

    let resources$ = this.httpService
      .get<ResourcesResponse>(`https://reqres.in/api/unknown/?page=${page}`, {
        headers: this.headers
      });

    resources$ = resources$
      .pipe(
        map(response => {
          this.resourcesCache.set(page, response);
          return response;
        }));

    return resources$;
  }

  putUser(newUser: User): Observable<User> {
    let headers = this.headers
      .set("content-type", "application/json");

    let user$ = this.httpService
      .put<User>(
        `https://reqres.in/api/users/${newUser.id}`,
        newUser, {
        headers
      });

    user$ = user$.pipe(
      map(user => {
        if (this.userCache.get(user.id)) {
          this.userCache.set(user.id, user);
        }

        for (let v of this.usersCache.values()) {
          if (v.data.some(u => u.id == user.id)) {
            let index = v.data.findIndex(u => u.id == user.id)
            v.data[index] = user;
          }
        }
        return user;
      }));

    return user$;
  }

  deleteUser(userId: number) {
    let user$ = this.httpService
      .delete<User>(
        `https://reqres.in/api/users/${userId}`, {
        headers: this.headers
      }).pipe(
        map(user => {
          for (let [k, v] of this.usersCache.entries()) {
            if (v.data.some(u => u.id == userId)) {
              let new_array = v.data.filter(u => u.id != userId);
              let new_response: UsersResponse = { ...v, data: new_array };
              this.usersCache.set(k, new_response);
            }
          }

          this.userCache.delete(userId);
          return user;
        }));

    return user$;
  }
}
