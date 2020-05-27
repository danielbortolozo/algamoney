import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']

})

export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela', {static: false}) grade;


  constructor(private lancamentoService: LancamentoService,
              private toastyService: ToastyService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    //   this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado['lancamentos'],
          this.totalRegistros = resultado['total']
          if (pagina == 0) {
            this.grade.first = 0;
          }
      })
      .catch(error => this.errorHandler.handle(error));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.excluir(lancamento);
    this.confirmationService.confirm({
      message: 'teste',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {

        this.grade.first = 0;
        this.pesquisar();
        this.toastyService.success('Lancamento excluído com sucesso. Assistir aula 17.10 confirmDialog !!!');
      })
      .catch(error => this.errorHandler.handle(error));
  }

  limparCampos() {
     this.filtro.descricao = null;
     this.filtro.dataVencimentoInicio = undefined;
     this.filtro.dataVencimentoFim = undefined;

  }


}
