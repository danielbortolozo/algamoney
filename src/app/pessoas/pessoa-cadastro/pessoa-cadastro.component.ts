import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { Pessoa } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Novo lançamento');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
        this.carregarPessoa(codigoPessoa);
    }
  }
  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {

     this.pessoaService.adicionar(this.pessoa)
     .then(() => {
       this.toasty.success('Pessoa adicionado(a) com sucesso !!!');
       form.reset();
       this.pessoa = new Pessoa();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {

    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.toasty.success('Pessoa alterado com sucesso !!!');
      this.editarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
 }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoa => {
       this.pessoa = pessoa;
       this.editarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
 }

 editarTituloEdicao() {
  this.title.setTitle(`Ediçao de lançamento: ${this.pessoa.nome}`);
}

}
