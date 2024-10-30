import { Component, OnInit } from '@angular/core';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraphComponent } from '../graph/graph.component';
import { CommonModule } from '@angular/common';
import { PokemonModel } from '../../Models/Pokemon';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [PokedexComponent, GraphComponent, CommonModule],
  templateUrl: './pokedex-view.component.html',
  styleUrls: ['./pokedex-view.component.css']
})
export class PokedexViewComponent implements OnInit {
  currentPokemon?: PokemonModel;
  currentPokemonId: number = 1;
  maxPokemonId: number = 151;
  baseImageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
  pokemonName: string = '';

  constructor() {
    this.loadPokemonData();
  }

  ngOnInit() {
    this.loadPokemonData();
  }

  getPokemonImageUrl(): string {
    return `${this.baseImageUrl}${this.currentPokemonId}.png`;
  }

  loadPokemonData(): void {
    // Aquí simularemos datos por ahora, pero esto podría venir de una API
    this.currentPokemon = new PokemonModel(
      this.currentPokemonId,
      this.getPokemonName(this.currentPokemonId),
      this.getPokemonImageUrl(),
      Math.floor(Math.random() * 100) + 50, // HP aleatorio entre 50-150
      Math.floor(Math.random() * 80) + 40,  // ATK aleatorio entre 40-120
      Math.floor(Math.random() * 70) + 30,  // DEF aleatorio entre 30-100
      this.getPokemonType(this.currentPokemonId)
    );
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

  isPrevDisabled(): boolean {
    return this.currentPokemonId <= 1;
  }

  isNextDisabled(): boolean {
    return this.currentPokemonId >= this.maxPokemonId;
  }

  private getPokemonName(id: number): string {
    // Array con algunos nombres de ejemplo
    const names = ['Bulbasaur', 'Ivysaur', 'Venusaur', 'Charmander', 'Charmeleon'];
    return names[id - 1] || `Pokemon ${id}`;
  }

  private getPokemonType(id: number): string {
    // Array con algunos tipos de ejemplo
    const types = ['Grass', 'Fire', 'Water', 'Electric', 'Psychic'];
    return types[Math.floor(Math.random() * types.length)];
  }
}