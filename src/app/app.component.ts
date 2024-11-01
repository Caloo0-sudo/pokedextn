import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokedexViewComponent } from './Components/pokedex-view/pokedex-view.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './Components/pokedex/pokedex.component';
import { GraphComponent } from './Components/graph/graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PokedexViewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Cambiado de styleUrl a styleUrls
})
export class AppComponent {
  title = 'myapp';
}
