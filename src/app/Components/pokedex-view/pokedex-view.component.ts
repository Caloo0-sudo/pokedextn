import { Component, OnInit, CommonModule } from '@angular/core';
import { PokemonModel } from '../../Models/Pokemon';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [PokedexComponent, GraphComponent,CommonModule],
  templateUrl: './pokedex-view.component.html',
  styleUrl: './pokedex-view.component.css'
})
export class PokedexViewComponent implements OnInit {
  pokemonList: PokemonModel[] = [];
  currentIndex: number = 0;
  currentPokemon?: PokemonModel;

  ngOnInit() {
    // Aquí puedes inicializar tu lista de Pokemon
    this.pokemonList = [
      new PokemonModel(1, 'Bulbasaur', 'assets/bulbasaur.png', 45, 49, 49, 'Planta'),
      new PokemonModel(2, 'Charmander', 'assets/charmander.png', 39, 52, 43, 'Fuego'),
      new PokemonModel(3, 'Squirtle', 'assets/squirtle.png', 44, 48, 65, 'Agua'),
      // Añade más Pokemon aquí
    ];
    this.currentPokemon = this.pokemonList[0];
  }

  prevPokemon() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentPokemon = this.pokemonList[this.currentIndex];
    }
  }

  nextPokemon() {
    if (this.currentIndex < this.pokemonList.length - 1) {
      this.currentIndex++;
      this.currentPokemon = this.pokemonList[this.currentIndex];
    }
  }
}