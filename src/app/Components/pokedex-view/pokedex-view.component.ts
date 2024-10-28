import { Component } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraphComponent } from '../graph/graph.component';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [PokedexComponent, GraphComponent],
  templateUrl: './pokedex-view.component.html',
  styleUrl: './pokedex-view.component.css'
})
export class PokedexViewComponent {

}
