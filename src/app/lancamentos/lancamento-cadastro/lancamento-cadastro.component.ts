import { Lancamento } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';

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
  lancamento = new Lancamento();


  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private toasty: ToastyService,
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
  salvar(form: FormControl) {

    this.lancamentoService.adicionar(this.lancamento)
     .then(() => {
       this.toasty.success('Lançamento adicionado com sucesso !!!');
       form.reset();
       this.lancamento = new Lancamento();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

}
