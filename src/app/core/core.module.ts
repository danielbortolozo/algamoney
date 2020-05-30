import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { ConfirmationService } from 'primeng/api';
import { CategoriaService } from '../categoria/categoria.service';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    ToastyModule,
    CommonModule,
    RouterModule

  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent,
            ToastyModule],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    CategoriaService
  ]
})
export class CoreModule { }
