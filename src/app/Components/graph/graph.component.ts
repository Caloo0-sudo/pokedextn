import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonModel } from '../../Models/Pokemon';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges {
  @Input() pokemon?: PokemonModel;

  ngOnChanges() {
    if (this.pokemon) {
      this.updateStats();
    }
  }

  private updateStats() {
    if (this.pokemon) {
      // Actualizar las estadísticas en el gráfico
    }
  }
}