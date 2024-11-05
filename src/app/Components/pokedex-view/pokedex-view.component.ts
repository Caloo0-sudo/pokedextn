import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraphComponent } from '../graph/graph.component';
import { FormsModule } from '@angular/forms';
import { PokemonModel } from '../../Models/Pokemon';


@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraphComponent, FormsModule],
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

  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.currentPokemon = new PokemonModel(
        this.currentPokemonId,
        this.getPokemonName(this.currentPokemonId),
        this.getPokemonImageUrl(),
        Math.floor(Math.random() * 100) + 50, // HP
        Math.floor(Math.random() * 80) + 40,  // ATK
        Math.floor(Math.random() * 70) + 30,  // DEF
        this.getPokemonType(this.currentPokemonId)
      );
      this.isLoading = false;
    }, 1000);
  }

  prevPokemon() {
    if (this.currentPokemonId > 1) {
      this.currentPokemonId--;
      this.loadPokemonData();
    }
  }

  nextPokemon() {
    if (this.currentPokemonId < this.maxPokemonId) {
      this.currentPokemonId++;
      this.loadPokemonData();
    }
  }

  isPrevDisabled(): boolean {
    return this.currentPokemonId <= 1;
  }

  isNextDisabled(): boolean {
    return this.currentPokemonId >= this.maxPokemonId;
  }

  onSearch() {
    if (this.searchTerm.length > 0) {
      this.searchResults = Array.from({ length: 5 }, (_, i) =>
        new PokemonModel(
          i + 1,
          `Pokemon ${i + 1}`,
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`,
          Math.floor(Math.random() * 100) + 50,
          Math.floor(Math.random() * 80) + 40,
          Math.floor(Math.random() * 70) + 30,
          this.getPokemonType(i + 1)
        )
      ).filter(pokemon => pokemon.getNombre().toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.searchResults = [];
    }
  }

  selectPokemon(pokemon: PokemonModel) {
    this.currentPokemon = pokemon;
    this.currentPokemonId = pokemon.getId();
    this.searchTerm = '';
    this.searchResults = [];
  }

  getPokemonImageUrl(): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.currentPokemonId}.png`;
  }

  getPokemonName(id: number): string {
    return `Pokemon ${id}`;
  }

  getPokemonType(id: number): string {
    const types = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground'];
    return types[Math.floor(Math.random() * types.length)];
  }
}