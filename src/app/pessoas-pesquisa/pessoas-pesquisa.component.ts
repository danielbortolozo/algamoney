import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  {

  pessoas = [
    {nome: 'Vera Marcia R. Bortolozo',  cidade: 'Fernandópolis', estado: 'SP', status: 'Ativo'},
    {nome: 'Mauro Bortolozo Junior',  cidade: 'Macedônia', estado: 'SP', status: 'Ativo'},
    {nome: 'Daianne Rocca Bortolozo',  cidade: 'São João Das Duas Pontes', estado: 'SP', status: 'Ativo'},
    {nome: 'Daniel Rocca Bortolozo',  cidade: 'São Paulo', estado: 'SP', status: 'Ativo'},
    {nome: 'Vitor Rocca Bortolozo',  cidade: 'São José do Rio Preto', estado: 'SP', status: 'Inativo'},
    {nome: 'Rodrigo Scavone',  cidade: 'São João Das Duas Pontes', estado: 'SP', status: 'Inativo'},
    {nome: 'Willia Sanaiotte Rocca',  cidade: 'São José do Rio Preto', estado: 'SP', status: 'Ativo'},
    {nome: 'Nelson Rocca',  cidade: 'São José do Rio Preto', estado: 'SP', status: 'Inativo'}
  ];


}
