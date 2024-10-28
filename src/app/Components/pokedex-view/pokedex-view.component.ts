import { Component } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraphComponent } from '../graph/graph.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [PokedexComponent, GraphComponent, CommonModule],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent {
  currentPokemonId: number = 1;
  maxPokemonId: number = 151; // Límite de la primera generación
  baseImageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  // Obtener la URL completa de la imagen
  getPokemonImageUrl(): string {
    return `${this.baseImageUrl}${this.currentPokemonId}.png`;
  }

  prevPokemon(): void {
    if (this.currentPokemonId > 1) {
      this.currentPokemonId--;
      this.loadPokemonData();
    }
  }

  nextPokemon(): void {
    if (this.currentPokemonId < this.maxPokemonId) {
      this.currentPokemonId++;
      this.loadPokemonData();
    }
  }

  loadPokemonData(): void {
    console.log(`Cargando Pokémon #${this.currentPokemonId}`);
    // Aquí puedes implementar la lógica para cargar los datos del Pokémon
  }

  isPrevDisabled(): boolean {
    return this.currentPokemonId <= 1;
  }

  isNextDisabled(): boolean {
    return this.currentPokemonId >= this.maxPokemonId;
  }
}