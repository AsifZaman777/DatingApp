import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Dating app';
  users: any;
  private accountService = inject(AccountService);

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.accountService.currentUser.set(JSON.parse(user));
    }
    else {
     return;
    }
  }

  getUsers() {
    this.http.get('http://localhost:5069/api/users').subscribe(
      {
        next: response => {
          this.users = response; // Store response in users
          console.log(this.users);
        },
        error: error => console.log(error),
        complete: () => console.log('complete')
       
      }
    );
  }
}
