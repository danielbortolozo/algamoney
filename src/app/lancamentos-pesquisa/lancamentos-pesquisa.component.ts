import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    {tipo: 'DESPESA',  descricao: 'Mercado', dataVencimento: '05/02/2018',
    dataPagamento: null, valor: 58.55, pessoa: 'Extra'},
    {tipo: 'RECEITA',  descricao: 'SALARIO', dataVencimento: '01/08/2017',
    dataPagamento: '02/08/2017', valor: 1004.55, pessoa: 'opah'},
    {tipo: 'DESPESA',  descricao: 'Compra de pão', dataVencimento: '30/06/2017',
    dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    {tipo: 'RECEITA',  descricao: 'SALARIO', dataVencimento: '01/07/2017',
    dataPagamento: '02/07/2017', valor: 7004.55, pessoa: 'opah'}
 ];

}
