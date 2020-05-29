import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];
  categorias = [];

  pessoas = [];


  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService) {

  }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
      return this.pessoaService.listarTodas()
      .then(obj => { this.pessoas = obj.map(o => ({ label: o.nome, value: o.codigo}));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
