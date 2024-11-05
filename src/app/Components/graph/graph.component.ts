import { Component, Input, OnChanges } from '@angular/core';
import { PokemonModel } from '../../Models/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges {
  @Input() pokemon?: PokemonModel;
  stats: Array<{ name: string, value: number }> = [];

  ngOnChanges() {
    if (this.pokemon) {
      this.updateStats();
    }
  }

  private updateStats() {
    this.stats = [
      { name: 'HP', value: this.pokemon!.getVida() },
      { name: 'ATK', value: this.pokemon!.getAtaque() },
      { name: 'DEF', value: this.pokemon!.getDefensa() }
    ];
  }

  getStatPercentage(value: number): number {
    const maxStat = 255; // Máximo valor posible de estadística
    return (value / maxStat) * 100;
  }
}