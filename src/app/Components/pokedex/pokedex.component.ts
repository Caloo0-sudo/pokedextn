// src/app/Components/pokedex/pokedex.component.ts
import { Component, Input, OnChanges } from '@angular/core';
import { PokemonModel } from '../../Models/Pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnChanges {
  @Input() pokemon?: PokemonModel;
  isLoading: boolean = true;

  ngOnChanges() {
    if (this.pokemon) {
      this.isLoading = true; // Iniciar la carga al recibir un nuevo Pokémon
    }
  }

  onImageLoad() {
    this.isLoading = false; // Finalizar la carga cuando la imagen se carga
  }

  getStat(stat: string): number {
    switch (stat) {
      case 'HP':
        return this.pokemon?.getVida() || 0;
      case 'ATK':
        return this.pokemon?.getAtaque() || 0;
      case 'DEF':
        return this.pokemon?.getDefensa() || 0;
      default:
        return 0;
    }
  }

  getStatPercentage(stat: string): number {
    const value = this.getStat(stat);
    const maxStat = 255; // Máximo valor posible de estadística
    return (value / maxStat) * 100