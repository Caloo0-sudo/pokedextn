import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']  // Asegúrate de que esto sea styleUrls
})
export class GraphComponent {
  idPokemon: string = "#0007";
  nombrePokemon: string = 'Squirtle';
  tipoPokemon: string = 'Agua'; // Asignar un tipo de Pokémon
  vidaPokemon: number = 100;
  ataquePokemon: number = 55; // Ejemplo de ataque
  defensaPokemon: number = 50; // Ejemplo de defensa
}
