import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



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
      console.log('Enctrei no nome');
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




}
