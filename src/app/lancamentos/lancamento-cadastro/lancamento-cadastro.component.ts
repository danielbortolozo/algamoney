import { Lancamento } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';

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
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
       this.carregarLancamentos(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
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
     if (this.editando) {
       this.atualizarLancamento(form);
     } else {
       this.adicionarLancamento(form);
     }

  }

  adicionarLancamento(form: FormControl) {

    this.lancamentoService.adicionar(this.lancamento)
     .then(lancamentoAdicionado => {
       this.toasty.success('Lançamento adicionado com sucesso !!!');
       console.log(lancamentoAdicionado.codigo);
       this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
     })
     .catch(erro => {

       this.errorHandler.handle(erro);

    });
  }

  atualizarLancamento(form: FormControl) {

     this.lancamentoService.atualizar(this.lancamento)
     .then(lancamento => {
       this.lancamento = lancamento;
       this.toasty.success('Lançamento alterado com sucesso !!!');

     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamentos(codigo: number) {
     this.lancamentoService.buscarPorCodigo(codigo)
     .then(lancamento => {
        this.lancamento = lancamento;
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
     form.reset();
     setTimeout(function() {
      this.lancamento = new Lancamento();
     }.bind(this), 1);

     this.router.navigate(['/lancamentos/novo']);
  }

}
