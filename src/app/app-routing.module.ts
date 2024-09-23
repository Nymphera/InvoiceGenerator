import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {InvoiceFormComponent} from "./components/invoice-form/invoice-form.component";
import {InvoicePreviewComponent} from "./components/invoice-preview/invoice-preview.component";

const routes: Routes = [
  { path: 'form', component: InvoiceFormComponent },
  { path: 'summary', component: InvoicePreviewComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
