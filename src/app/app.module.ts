import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { CategoriaModule } from './categoria/categoria.module';

import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Routes, RouterModule } from '@angular/router';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';

const routes: Routes = [
   { path: 'lancamentos', component: LancamentosPesquisaComponent },
   { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
   { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
   { path: 'pessoas', component: PessoasPesquisaComponent},
   { path: 'pessoas/novo', component: PessoaCadastroComponent },
];

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent

    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LancamentosModule,
    PessoasModule,
    CategoriaModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot(routes)

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
