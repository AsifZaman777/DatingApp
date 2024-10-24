import { NgFor, NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  showWarning: boolean = false;

  //parent to child communication
  @Input() usersFromHome: any;

  hideToastTimeout() {
    setTimeout(() => {
      this.showWarning = false;
    }, 3000); 
  }

model: any = {};

register () {
  if(!this.model.username || !this.model.password || this.model.username.trim() === '' || this.model.password.trim() === '') {
    this.showWarning = true;
    this.hideToastTimeout();
  }
  else{
    this.showWarning = false;
    console.log(this.model);
  }
}

cancel ()
{
  console.log('cancelled');
}

}
