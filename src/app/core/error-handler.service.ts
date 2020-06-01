import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {


  constructor(private toasty: ToastyService,
    private htt: HttpClient) { }

  handle(errorResponse: any) {
    let msg: string;

    if (errorResponse['status'] == 400) {
         const erros: [] = errorResponse['error'];
         for (const erro of erros) {
            msg = erro['mensagemUsuario']+'. Error 400';
         }
    } else
      if (errorResponse['status'] == 404) {
          msg = 'Recurso não encontrado. Error 404';
      } else
         if (typeof errorResponse === 'string') {
            msg = errorResponse;
         } else {
              msg = 'Erro ao processar serviço remoto. Tente novamente';
           }

    this.toasty.error(msg);
  }


}
