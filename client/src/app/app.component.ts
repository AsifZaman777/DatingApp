import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  http = inject(HttpClient);
  title = 'Dating app';
  users: any;

  ngOnInit(): void {
    this.http.get('https://localhost:5069/api/users').subscribe(
      {
        next: response => this.users = response,
        error: error => console.log(error),
        complete: () => console.log('complete')
      }
    );
  } 
}
