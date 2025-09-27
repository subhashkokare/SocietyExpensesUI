import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { AttachmentService } from '../services/attachment.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-expense-upload',
  imports: [CommonModule, FormsModule],
  template: `
    <h3>Create Expense</h3>
    <form (ngSubmit)="submit()" style="max-width:640px">
      <div><label>Category <input [(ngModel)]="model.category" name="category" required /></label></div>
      <div><label>Date <input type="date" [(ngModel)]="model.date" name="date" required /></label></div>
      <div><label>Amount <input type="number" [(ngModel)]="model.amount" name="amount" required /></label></div>
      <div><label>Payment Mode <input [(ngModel)]="model.paymentMode" name="paymentMode" /></label></div>
      <div><label>Invoice # <input [(ngModel)]="model.invoiceNumber" name="invoiceNumber" /></label></div>
      <div><label>Description <textarea [(ngModel)]="model.description" name="description"></textarea></label></div>

      <div><label>Attachment <input type="file" (change)="onFileChange($event)" /></label></div>

      <div style="margin-top:8px">
        <button type="submit" [disabled]="uploading">Create</button>
      </div>
    </form>
  `
})
export class ExpenseUploadComponent {
  model: any = { category: '', date: '', amount: null, paymentMode: '', invoiceNumber: '', description: '' };
  selectedFile?: File;
  uploading = false;

  constructor(private expenseSvc: ExpenseService, private attachSvc: AttachmentService, private router: Router) {}

  onFileChange(e: any) { this.selectedFile = e.target.files && e.target.files[0]; }

  submit() {
    this.uploading = true;
    this.expenseSvc.create(this.model).subscribe(exp => {
      const id = exp.expenseId;
      if (this.selectedFile) {
        if (id !== undefined) {
          this.attachSvc.upload(id, this.selectedFile).subscribe(() => {
            alert('Expense created and file uploaded');
            this.uploading = false;
            this.router.navigate(['/']);
          }, err => { alert('Upload failed'); this.uploading = false; });
        } else {
          alert('Expense created, but no expenseId returned');
          this.uploading = false;
        }
      } else {
        alert('Expense created');
        this.uploading = false;
        this.router.navigate(['/']);
      }
    }, err => { alert('Create failed'); this.uploading = false; });
  }
}
