import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonModel } from '../../Models/Pokemon';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnChanges {
  @Input() pokemon?: PokemonModel;
  @Input() imageUrl: string = '';

  isLoading: boolean = true;
  showShineEffect: boolean = false;

  ngOnChanges() {
    if (this.pokemon) {
      this.isLoading = true;
      this.triggerShineEffect();
    }
  }

  onImageLoad() {
    this.isLoading = false;
  }

  triggerShineEffect() {
    this.showShineEffect = true;
    setTimeout(() => {
      this.showShineEffect = false;
    }, 2000);
  }

  getTypeClass(type: string): string {
    return `type-${type.toLowerCase()}`;
  }
}