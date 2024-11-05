import { Component, Input, OnChanges } from '@angular/core';
import { PokemonModel } from '../../Models/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnChanges {
  @Input() pokemon?: PokemonModel;
  @Input() imageUrl?: string;
  isLoading: boolean = true;

  ngOnChanges() {
    if (this.pokemon) {
      this.isLoading = true;
    }
  }

  onImageLoad() {
    this.isLoading = false;
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
}