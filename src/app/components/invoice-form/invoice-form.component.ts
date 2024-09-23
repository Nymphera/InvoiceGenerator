import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, isFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ErrorsModalComponent} from "../errors-modal/errors-modal.component";
import {Observable, of} from "rxjs";
import {InvoiceItem} from "../../model/invoice-item";
import {InvoiceService} from "../../services/invoice.service";



@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {
  invoiceForm: FormGroup;
  errorMessages: string[] = [];
  dialogRef: any;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private matDialog: MatDialog,
              private invoiceService: InvoiceService) {
    this.invoiceForm = this.formBuilder.group({
      items: this.formBuilder.array([this.createFormItem()])
    })
  }

  createFormItem () {
    return this.formBuilder.group({
      name:['', {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(30)]}],
      count:['1', {validators: [Validators.required, Validators.min(1), Validators.max(100)]}],
      price:['1', {validators: [Validators.required, Validators.min(1), Validators.max(1000000)]}],
    })
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createFormItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  save() {
    if (this.items.length === 0) {
      this.openErrorModal(['Please add items']);
      return;
    }

    if (this.invoiceForm.invalid) {
      this.collectErrors().subscribe(errors => {
        this.openErrorModal(errors);
      });
    } else {
      this.gotoSummary();
    }

    this.dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.event == "Continue") {
        this.gotoSummary();
      }
    });
  }

  private openErrorModal(errors: string[]): void {
    this.dialogRef = this.matDialog.open(ErrorsModalComponent, {
      width: '1000px',
      height: '600px',
      data: {
        errors: errors
      }
    })
  }

  private gotoSummary() {
    this.invoiceService.setItems(this.getValidItems());
    this.router.navigate(['/summary']);
  }

  private getValidItems(): InvoiceItem[] {
    return this.items.controls
      .filter(item => item.valid)
      .map(item => item.value);
  }


  // Do obmyślenia lepszy sposób zbierania errorów
  private collectErrors(): Observable<string[]> {
    let errorMessages: string[] = [];
    this.items.controls.forEach((item, index) => {
      const nameErrors = item.get('name')?.errors;
      const countErrors = item.get('count')?.errors;
      const priceErrors = item.get('price')?.errors;

      if (nameErrors) {
        if (nameErrors.required) {
          errorMessages.push(`Item ${index + 1}: Name is required.`);
        }
        if (nameErrors.minlength) {
          errorMessages.push(`Item ${index + 1}: Name must be at least 3 characters.`);
        }
        if (nameErrors.maxlength) {
          errorMessages.push(`Item ${index + 1}: Name cannot exceed 30 characters.`);
        }
      }

      if (countErrors) {
        if (countErrors.required) {
          errorMessages.push(`Item ${index + 1}: Count is required.`);
        }
        if (countErrors.min) {
          errorMessages.push(`Item ${index + 1}: Count must be at least 1.`);
        }
        if (countErrors.max) {
          errorMessages.push(`Item ${index + 1}: Count cannot exceed 100.`);
        }
      }

      if (priceErrors) {
        if (priceErrors.required) {
          errorMessages.push(`Item ${index + 1}: Price is required.`);
        }
        if (priceErrors.min) {
          errorMessages.push(`Item ${index + 1}: Price must be at least 1.`);
        }
        if (priceErrors.max) {
          errorMessages.push(`Item ${index + 1}: Price cannot exceed 1,000,000.`);
        }
      }
    });
    return of(errorMessages);
  }
}
