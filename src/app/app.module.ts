import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {AppComponent} from './app.component';
import {InvoicePreviewComponent} from './components/invoice-preview/invoice-preview.component';
import {InvoiceFormComponent} from './components/invoice-form/invoice-form.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {ErrorsModalComponent} from './components/errors-modal/errors-modal.component';
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    InvoicePreviewComponent,
    InvoiceFormComponent,
    NavbarComponent,
    ErrorsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    CommonModule,
    AppRoutingModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
