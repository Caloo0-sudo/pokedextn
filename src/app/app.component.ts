import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokedexViewComponent } from './Components/pokedex-view/pokedex-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokedexViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
