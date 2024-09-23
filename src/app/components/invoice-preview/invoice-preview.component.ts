import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ErrorsModalComponent} from "../errors-modal/errors-modal.component";
import {InvoiceItem} from "../../model/invoice-item";
import {InvoiceService} from "../../services/invoice.service";
import {Company} from "../../model/company";

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.css']
})
export class InvoicePreviewComponent {

  company: Company;
  items: InvoiceItem[] = [];
  totalCount: number = 0;
  displayedColumns: string[] = ['name', 'count', 'price', 'total'];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getCompanyInfo().subscribe(result => {
      this.company = result;
    });

    this.items = this.invoiceService.getItems();
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalCount = this.items.reduce((sum, item) => sum + (item.count * item.price), 0);
  }
}
