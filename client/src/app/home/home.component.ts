import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
registerMode : boolean = false;
users: any;
http = inject(HttpClient);

ngOnInit(): void {
  this.getUsers();
}

registerToggle(){
  this.registerMode = !this.registerMode;
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
