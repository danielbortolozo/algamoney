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
        msg = 'Operação não permitida. Error 400';
    } else
      if (errorResponse['status'] == 404) {
          msg = 'Recurso não encontrado';
      } else
         if (typeof errorResponse === 'string') {
            msg = errorResponse;
         } else {
              msg = 'Erro ao processar serviço remoto. Tente novamente';
              console.log(errorResponse);
           }

    this.toasty.error(msg);
  }


}
