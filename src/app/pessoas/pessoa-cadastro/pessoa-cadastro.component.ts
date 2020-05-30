import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { Pessoa } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent  {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService) {}


  salvar(form: FormControl) {

     this.pessoaService.adicionar(this.pessoa)
     .then(() => {
       this.toasty.success('Pessoa adicionado(a) com sucesso !!!');
       form.reset();
       this.pessoa = new Pessoa();
     })
     .catch(erro => this.errorHandler.handle(erro));
  }
}
