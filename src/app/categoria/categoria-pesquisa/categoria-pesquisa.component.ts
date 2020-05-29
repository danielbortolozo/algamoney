import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';


@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  categorias = [];


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.pesquisar();
  }


  pesquisar() {

     this.categoriaService.pesquisar()
     .then(response => this.categorias = response);
  }



}
