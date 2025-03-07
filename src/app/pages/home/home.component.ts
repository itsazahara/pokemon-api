import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class HomeComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemons: any[] = []; // Lista filtrada para la búsqueda
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  offset = 0;
  limit = 20;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons(this.limit, this.offset).subscribe((data) => {
      this.pokemons = data.results;
      this.filteredPokemons = this.pokemons; // Inicializar la lista filtrada
    });
  }

  // Filtrar Pokémon en tiempo real
  filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage(): void {
    this.offset += this.limit;
    this.getPokemons();
  }

  prevPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getPokemons();
    }
  }
}