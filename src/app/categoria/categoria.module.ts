import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CategoriaCadastroComponent,
    CategoriaPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule
  ],
  exports: [
    CategoriaCadastroComponent,
    CategoriaPesquisaComponent
  ]
})
export class CategoriaModule { }
