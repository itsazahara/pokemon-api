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
  species: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('id');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data;
      });
    }
  }

  // Función para asignar un color aleatorio a cada tipo
  getTypeColor(typeName: string): string {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff8c33", "#33fff6"];
    const index = typeName.length % colors.length; // Basado en la longitud del nombre
    return colors[index];
  }

  // Función para asignar un color aleatorio a cada habilidad
  getAbilityColor(abilityName: string): string {
    const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a1", "#ff8c33", "#33fff6"];
    const index = abilityName.length % colors.length; // Basado en la longitud del nombre
    return colors[index];
  }
}
