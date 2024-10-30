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
  searchTerm: string = '';
  isLoading: boolean = false;
  searchResults: PokemonModel[] = [];

  // Lista de Pokémon predefinida para la búsqueda
  pokemonList: PokemonModel[] = [
    new PokemonModel(1, 'Bulbasaur', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', 45, 49, 49, 'Grass'),
    new PokemonModel(4, 'Charmander', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', 39, 52, 43, 'Fire'),
    new PokemonModel(7, 'Squirtle', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', 44, 48, 65, 'Water'),
    // Añade más Pokémon aquí...
  ];

  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData() {
    this.isLoading = true;
    // Simular carga de datos
    setTimeout(() => {
      this.currentPokemon = this.pokemonList.find(p => p.getId() === this.currentPokemonId);
      this.isLoading = false;
    }, 500);
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.pokemonList.filter(pokemon =>
      pokemon.getNombre().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectPokemon(pokemon: PokemonModel) {
    this.currentPokemon = pokemon;
    this.currentPokemonId = pokemon.getId();
    this.searchResults = [];
    this.searchTerm = '';
  }

  nextPokemon() {
    if (this.currentPokemonId < this.maxPokemonId) {
      this.currentPokemonId++;
      this.loadPokemonData();
    }
  }

  prevPokemon() {
    if (this.currentPokemonId > 1) {
      this.currentPokemonId--;
      this.loadPokemonData();
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPokemonId <= 1 || this.isLoading;
  }

  isNextDisabled(): boolean {
    return this.currentPokemonId >= this.maxPokemonId || this.isLoading;
  }
}