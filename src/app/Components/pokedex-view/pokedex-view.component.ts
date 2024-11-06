// src/app/Components/pokedex-view/pokedex-view.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokedexComponent } from '../pokedex/pokedex.component';
import { GraphComponent } from '../graph/graph.component';
import { FormsModule } from '@angular/forms';
import { PokemonModel } from '../../Models/Pokemon';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

interface PokemonListResponse {
  count: number;
  results: Array<{ name: string, url: string }>;
}

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
  maxPokemonId: number = 0;
  isLoading: boolean = true;
  searchTerm: string = '';
  searchResults: PokemonModel[] = [];

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';
  private spriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTotalPokemonCount().subscribe(count => {
      this.maxPokemonId = count;
      this.loadPokemonData();
    });
  }

  getTotalPokemonCount(): Observable<number> {
    return this.http.get<PokemonListResponse>(`${this.baseUrl}?limit=1`).pipe(
      map(response => response.count)
    );
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
      }),
      catchError(error => {
        console.error('Error fetching Pokemon:', error);
        return of(new PokemonModel(id, 'Unknown', '', 0, 0, 0, 'UNKNOWN'));
      })
    );
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onSearch() {
    if (this.searchTerm.length > 0) {
      this.http.get<PokemonListResponse>(`${this.baseUrl}?limit=${this.maxPokemonId}`).pipe(
        switchMap(response => {
          const filteredResults = response.results
            .filter(pokemon => pokemon.name.includes(this.searchTerm.toLowerCase()))
            .slice(0, 5);
          return forkJoin(filteredResults.map(pokemon => this.getPokemon(this.getIdFromUrl(pokemon.url))));
        })
      ).subscribe(pokemons => {
        this.searchResults = pokemons;
      });
    } else {
      this.searchResults = [];
    }
  }

  private getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
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