// src/app/Components/pokedex-view/pokedex-view.component.ts
import { Component, OnInit } from '@angular/core';
import { PokemonModel } from '../../Models/Pokemon';

@Component({
  selector: 'app-pokedex-view',
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent implements OnInit {
  currentPokemon?: PokemonModel;
  currentPokemonId: number = 1;
  maxPokemonId: number = 151;
  isLoading: boolean = true;
  searchTerm: string = '';
  searchResults: PokemonModel[] = [];

  constructor() { }

  ngOnInit() {
    this.loadPokemonData(this.currentPokemonId);
  }

  loadPokemonData(): void {
  this.currentPokemon = new PokemonModel(
    this.currentPokemonId,
    this.getPokemonName(this.currentPokemonId),
    this.getPokemonImageUrl(),
    Math.floor(Math.random() * 100) + 50, // HP
    Math.floor(Math.random() * 80) + 40,  // ATK
    Math.floor(Math.random() * 70) + 30,  // DEF
    this.getPokemonType(this.currentPokemonId)
  );
  }

  prevPokemon() {
    if (this.currentPokemonId > 1) {
      this.currentPokemonId--;
      this.loadPokemonData(this.currentPokemonId);
    }
  }

  nextPokemon() {
    if (this.currentPokemonId < this.maxPokemonId) {
      this.currentPokemonId++;
      this.loadPokemonData(this.currentPokemonId);
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPokemonId <= 1;
  }

  isNextDisabled(): boolean {
    return this.currentPokemonId >= this.maxPokemonId;
  }

  onSearch() {
    // Aquí deberías implementar la lógica de búsqueda
    // Por ahora, simularemos resultados
    this.searchResults = [
      new PokemonModel(25, 'Pikachu', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 35, 55, 40, 'Electric'),
      new PokemonModel(4, 'Charmander', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', 39, 52, 43, 'Fire')
    ].filter(pokemon => pokemon.getNombre().toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  selectPokemon(pokemon: PokemonModel) {
    this.currentPokemon = pokemon;
    this.currentPokemonId = pokemon.getId();
    this.searchTerm = '';
    this.searchResults = [];
  }
}
