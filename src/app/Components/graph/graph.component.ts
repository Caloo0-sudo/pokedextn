import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  chartData: any = {
    labels: ['HP', 'Ataque', 'Defensa'],
    datasets: [{
      data: [0, 0, 0],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: 1
    }]
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon'] && this.pokemon) {
      this.updateChartData();
    }
  }

  private updateChartData() {
    if (this.pokemon) {
      this.chartData.datasets[0].data = [
        this.pokemon.getVida(),
        this.pokemon.getAtaque(),
        this.pokemon.getDefensa()
      ];
    }
  }

  getStatPercentage(value: number): string {
    return `${(value / 255) * 100}%`;
  }
}