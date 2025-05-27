import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, LoginResponse, SignupResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: HttpHeaders;

  constructor(private httpService: HttpClient) {
    this.headers = new HttpHeaders().set("x-api-key", "reqres-free-v1");
  }

  login(authreq: AuthRequest): Observable<LoginResponse> {
    let headers = this.headers.set("content-type", "application/json");

    let session$ = this.httpService
      .post<LoginResponse>(
        `https://reqres.in/api/login`,
        authreq,
        { headers });

    return session$;
  }

  register(authreq: AuthRequest): Observable<SignupResponse> {
    let headers = this.headers.set("content-type", "application/json");

    let session$ = this.httpService
      .post<SignupResponse>(
        `https://reqres.in/api/register`,
        authreq,
        { headers });

    return session$;
  }
}
