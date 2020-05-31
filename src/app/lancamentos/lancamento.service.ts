import { Lancamento } from './../core/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic skdfjdkfj');

    if (filtro.dataVencimentoInicio != null && filtro.dataVencimentoFim == null) {
      alert('Preencha o campo da data final');
      return null;
    }
    if (filtro.dataVencimentoFim != null && filtro.dataVencimentoInicio == null) {
      alert('Preencha o campo da data inicial');
      return null;
    }

    if (filtro.descricao && filtro.dataVencimentoInicio == null && filtro.dataVencimentoFim == null) {
      return this.http.get(`${this.lancamentosUrl}?descricao=${filtro.descricao}&page=${filtro.pagina}&size=${filtro.itensPorPagina}`)
        .toPromise()
        .then(response => {
          const responseJson = response;
          const lancamentos = responseJson['content'];
          const resultado = {
            lancamentos,
            total: responseJson['totalElements']
          };
          return resultado;
        });
    } else
      if ((filtro.dataVencimentoInicio !== undefined) && (filtro.dataVencimentoFim !== undefined) &&
        (filtro.descricao == null || filtro.descricao === '')) {

        let dtIni = moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD');
        let dtFim = moment(filtro.dataVencimentoFim).format('YYYY-MM-DD');
        return this.http.get(`${this.lancamentosUrl}?page=${filtro.pagina}&size=${filtro.itensPorPagina}
           &dataVencimentoDe=${dtIni}&dataVencimentoAte=${dtFim}`)
          .toPromise()
          .then(response => {
            const responseJson = response;
            const lancamentos = responseJson['content'];
            const resultado = {
              lancamentos,
              total: responseJson['totalElements']
            };
            return resultado;
          });

      } else
        if (filtro.dataVencimentoInicio && filtro.dataVencimentoFim && filtro.descricao) {
          let dtIni = moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD');
          let dtFim = moment(filtro.dataVencimentoFim).format('YYYY-MM-DD');
          return this.http.get(`${this.lancamentosUrl}?page=${filtro.pagina}&size=${filtro.itensPorPagina}
          &descricao=${filtro.descricao}&dataVencimentoDe=${dtIni}&dataVencimentoAte=${dtFim}`)
            .toPromise()
            .then(response => {
              const responseJson = response;
              const lancamentos = responseJson['content'];
              const resultado = {
                lancamentos,
                total: responseJson['totalElements']
              };
              return resultado;
            });

        } else {
          return this.http.get(`${this.lancamentosUrl}?page=${filtro.pagina}&size=${filtro.itensPorPagina}`)
            .toPromise()
            .then(response => {
              const responseJson = response;
              const lancamentos = responseJson['content'];
              const resultado = {
                lancamentos,
                total: responseJson['totalElements']
              };
              return resultado;
            });
        }
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic skdfjdkfj');
     return this.http.post(this.lancamentosUrl, lancamento)
     .toPromise()
     .then(response => response as Lancamento);
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response as Lancamento;
      this.converterStringsParaDatas([lancamentoAlterado]);
      return lancamentoAlterado;
    });
  }

  buscarPorCodigo(codigo: number): Promise<any> {
     return this.http.get(`${this.lancamentosUrl}/${codigo}`)
     .toPromise()
     .then(response => {
       const lancamento = response as Lancamento;
       this.converterStringsParaDatas([lancamento]);
       return lancamento;
     });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
         lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}















