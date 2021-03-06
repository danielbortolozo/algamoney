import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
   { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
   { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
   { path: '**', redirectTo: 'pagina-nao-encontrada' },
];

@NgModule({
  imports: [

    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]

})
export class AppRoutingModule {


 }
