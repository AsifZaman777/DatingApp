import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
   model: any = {};
   showWarning: boolean = false; // show warning flag
   loggedIn: boolean = false; 
   private accountService= inject(AccountService);

   login() {
     if (!this.model.username || !this.model.password || 
         this.model.username.trim() === '' || this.model.password.trim() === '') {
       this.showWarning = true; 
     } else {
       this.showWarning = false; 
        this.accountService.login(this.model).subscribe(
          {
            next: (response) => {
              console.log(response);
              this.loggedIn = true;
            },
            error: (error) => {
              console.log(error);
            }
          }  
        )
     }
   }
}
