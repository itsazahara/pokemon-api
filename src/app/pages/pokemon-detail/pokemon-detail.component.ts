import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
  imports: [CommonModule]
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;
  pokemonImage: string = '';  // Añadido para almacenar la imagen actual

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('id');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data;
        // Aquí usamos la URL de la imagen oficial como la imagen estática predeterminada
        this.pokemonImage = this.pokemon.sprites.other['official-artwork'].front_default;
      });
    }
  }

  // Cambia a GIF cuando el ratón pasa por encima
  changeToGif(): void {
    const gifUrl = this.pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default;
    if (gifUrl) {
      this.pokemonImage = gifUrl; // Actualiza la imagen al GIF
    }
  }

  // Vuelve a la imagen estática cuando el ratón sale
  changeToStatic(): void {
    this.pokemonImage = this.pokemon.sprites.other['official-artwork'].front_default; // Vuelve a la imagen estática
  }

  // Función para asignar un color aleatorio a cada tipo
  getTypeColor(typeName: string): string {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff8c33", "#33fff6"];
    const index = typeName.length % colors.length;
    return colors[index];
  }

  // Función para asignar un color aleatorio a cada habilidad
  getAbilityColor(abilityName: string): string {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff8c33", "#33fff6"];
    const index = abilityName.length % colors.length;
    return colors[index];
  }
}
