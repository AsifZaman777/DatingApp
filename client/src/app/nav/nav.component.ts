import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common'; // Replace BrowserAnimationsModule with CommonModule
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule, BsDropdownModule], // CommonModule imported
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {};
  showWarning: boolean = false;
  accountService = inject(AccountService);

  hideToastTimeout() {
    setTimeout(() => {
      this.showWarning = false;
    }, 3000); 
  }

  login() {
    if (!this.model.username || !this.model.password || 
        this.model.username.trim() === '' || this.model.password.trim() === '') {
      this.showWarning = true; 
      this.hideToastTimeout(); 
    } else {
      this.showWarning = false; 
      this.accountService.login(this.model).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => { 
          console.log(error);
        }
      });
    }
  }

  logout() {
    this.accountService.logout();
  }
}
