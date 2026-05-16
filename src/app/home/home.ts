import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta-service';
import { Meta } from '../models/meta.model';

@Component({
  selector: 'app-home',
  standalone: false, // Lo dejamos tal cual te lo generó
  templateUrl: './home.html',
  styleUrl: './home.css', // Respetamos el singular de tu versión
})
export class Home implements OnInit {
  listaMetas: Meta[] = [];
  nuevaMetaTexto: string = '';

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    // Nos suscribimos a los datos de Firestore para que se actualicen en tiempo real
    this.metaService.getMetas().subscribe({
      next: (data) => {
        this.listaMetas = data;
      },
      error: (err) => console.error("Error al traer metas de Firestore:", err)
    });
  }

  guardarMeta(): void {
    if (this.nuevaMetaTexto.trim() === '') return;

    this.metaService.addMeta(this.nuevaMetaTexto).then(() => {
      this.nuevaMetaTexto = ''; // Limpiamos la caja de texto al guardar
    }).catch(err => console.error("Error al guardar meta:", err));
  }

  borrarMeta(id: string | undefined): void {
    if (!id) return;
    
    this.metaService.deleteMeta(id).catch(
      err => console.error("Error al eliminar meta:", err)
    );
  }
}