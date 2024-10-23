import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs/operators';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseurl = 'http://localhost:5069/api/';
  currentUser = signal<User | null>(null); // Signal for current user

  login(model: any) {
    return this.http.post<User>(this.baseurl + 'account/login', model).pipe(    // posts returns an observable so use pipe to map the response
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
          console.log(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }


}