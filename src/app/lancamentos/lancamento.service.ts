import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import 'rxjs/add/operator/toPromise';

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


    if (filtro.descricao) {
      console.log('Enctrei no descricao');
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
    }
    if (filtro.dataVencimentoInicio) {

      return this.http.get(`${this.lancamentosUrl}?dataVencimentoDe=${filtro.dataVencimentoInicio }`)
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




}
