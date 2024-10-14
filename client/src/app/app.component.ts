import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Dating app';
  users: any;

  ngOnInit(): void {
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
