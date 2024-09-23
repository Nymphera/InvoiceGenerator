import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Company} from "../model/company";
import {InvoiceItem} from "../model/invoice-item";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private itemsSubject = new BehaviorSubject<InvoiceItem[]>([]);
  private apiUrl = 'assets/company.json';

  constructor(private http: HttpClient) { }

  getCompanyInfo(): Observable<Company> {
    return this.http.get<Company>(this.apiUrl);
  }

  setItems(items: InvoiceItem[]) {
    this.itemsSubject.next(items);
  }

  getItems(): InvoiceItem[] {
    return this.itemsSubject.getValue();
  }
}
