import { Component, Input, input } from '@angular/core';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent {
   @Input({required:true}) imageUrl: string = ' ';

}
