
import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { ToastyModule } from 'ng2-toasty';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LancamentosModule,
    PessoasModule,
    ToastyModule,
    CoreModule,
    HttpClientModule

  ],
  providers: [LancamentoService,
              PessoaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
