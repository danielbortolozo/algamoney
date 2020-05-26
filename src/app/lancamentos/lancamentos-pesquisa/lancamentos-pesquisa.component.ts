import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/public_api';
import { ToastyService } from 'ng2-toasty';


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
              private toastyService: ToastyService) { }

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
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.excluir(lancamento);

  }


  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {

        this.grade.first = 0;
        this.pesquisar();
        this.toastyService.success('Lancamento excluído com sucesso. Assistir aula 17.10 confirmDialog !!!');
      });
  }

  limparCampos() {
     this.filtro.descricao = null;
     this.filtro.dataVencimentoInicio = undefined;
     this.filtro.dataVencimentoFim = undefined;

  }


}
