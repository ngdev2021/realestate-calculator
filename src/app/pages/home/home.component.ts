import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiTestComponent } from '../../components/gemini-test/gemini-test.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GeminiTestComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
