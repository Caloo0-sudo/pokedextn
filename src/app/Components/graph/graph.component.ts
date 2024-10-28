import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  // Propiedades del Pokémon
  idPokemon: string = "#0007";
  nombrePokemon: string = 'Squirtle';
  tipoPokemon: string = 'Agua';
  
  // Estadísticas (valores base sobre 100)
  vidaPokemon: number = 100;
  ataquePokemon: number = 55;
  defensaPokemon: number = 50;
}