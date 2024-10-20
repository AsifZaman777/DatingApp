import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'] // Corrected to 'styleUrls'
})
export class NavComponent {
   model: any = {};

   login() {
     console.log(this.model);
   }
}
