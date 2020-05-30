import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static apiUrl: string = 'http://localhost:2001';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(
      UserService.apiUrl + '/login',
      user
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(
      UserService.apiUrl + '/register',
      user
    );
  }

}
