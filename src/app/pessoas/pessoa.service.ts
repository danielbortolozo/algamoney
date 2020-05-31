import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../core/model';



export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic skdfjdkfj');

    if (filtro.nome) {
      return this.http.get(`${this.pessoasUrl}?nome=${filtro.nome}&page=${filtro.pagina}&size=${filtro.itensPorPagina}`)
        .toPromise()
        .then(response => {
           const responseJson = response;
           const pessoas = responseJson['content'];
           const resultado = {
               pessoas,
               total: responseJson['totalElements']
           };
           return resultado;
        });
    } else {
      return this.http.get(`${this.pessoasUrl}?page=${filtro.pagina}&size=${filtro.itensPorPagina}`)
        .toPromise()
        .then(response => {
           const responseJson = response;
           const pessoas = responseJson['content'];
           const resultado = {
               pessoas,
               total: responseJson['totalElements']
           };
           return resultado;

        });
    }

  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  // mudarStatus(codigo: number, ativo: boolean): Promise<void> {

  //   if (ativo == false) {
  //     ativo = true;
  //   } else {
  //     ativo = false;
  //   }
  //   return this.http.put(`${this.pessoasUrl}/${codigo}/${ativo}`)
  //      .toPromise()
  //      .then(() => null);
  // }

  listarTodas(): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic skdfjdkfj');

    return this.http.get(`${this.pessoasUrl}/listar`)
        .toPromise()
        .then(response => response);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic skdfjdkfj');
     return this.http.post(this.pessoasUrl, pessoa)
     .toPromise()
     .then(response => pessoa);

  }





}
