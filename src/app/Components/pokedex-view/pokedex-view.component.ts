// src/app/Components/pokedex-view/pokedex-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraphComponent } from '../graph/graph.component';
import { FormsModule } from '@angular/forms';
import { PokemonModel } from '../../Models/Pokemon';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex-view',
  standalone: true,
  imports: [CommonModule, PokedexComponent, GraphComponent, FormsModule, HttpClientModule],
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

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPokemonData();
  }

  loadPokemonData(): void {
    this.isLoading = true;
    this.getPokemon(this.currentPokemonId).subscribe({
      next: (pokemon) => {
        this.currentPokemon = pokemon;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading Pokemon:', error);
        this.isLoading = false;
      }
    });
  }

  getPokemon(id: number): Observable<PokemonModel> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(response => {
        return new PokemonModel(
          response.id,
          this.capitalizeFirstLetter(response.name),
          `${this.spriteUrl}/${id}.png`,
          response.stats.find((s: any) => s.stat.name === 'hp').base_stat,
          response.stats.find((s: any) => s.stat.name === 'attack').base_stat,
          response.stats.find((s: any) => s.stat.name === 'defense').base_stat,
          response.types[0].type.name.toUpperCase()
        );
      })
    );
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSearch() {
    if (this.searchTerm.length > 0) {
      const searches = Array.from({ length: 151 }, (_, i) => i + 1)
        .map(id => this.getPokemon(id));

      forkJoin(searches).subscribe(pokemons => {
        this.searchResults = pokemons
          .filter(pokemon => pokemon.getNombre().toLowerCase().includes(this.searchTerm.toLowerCase()))
          .slice(0, 5);
      });
    } else {
      this.searchResults = [];
    }
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

  selectPokemon(pokemon: PokemonModel) {
    this.currentPokemon = pokemon;
    this.currentPokemonId = pokemon.getId();
    this.searchTerm = '';
    this.searchResults = [];
  }

  isPrevDisabled(): boolean {
    return this.currentPokemonId <= 1;
  }

  isNextDisabled(): boolean {
    return this.currentPokemonId >= this.maxPokemonId;
  }

  getPokemonImageUrl(): string {
    return `${this.spriteUrl}/${this.currentPokemonId}.png`;
  }
}