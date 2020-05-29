import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent  implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', {static: false}) grade;

  constructor(private pessoaService: PessoaService,
              private toastyService: ToastyService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
   // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro)
     .then(resultado => {
         this.pessoas = resultado['pessoas'],
         this.totalRegistros = resultado['total']
     });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {

        this.grade.first = 0;
        this.pesquisar();
        this.toastyService.success('Pessoa excluído com sucesso. Assistir aula 17.10 confirmDialog !!!');
      })
      .catch(error => {


        this.errorHandler.handle(error)
      });
  }




}
