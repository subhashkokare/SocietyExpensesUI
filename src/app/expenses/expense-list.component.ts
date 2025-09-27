import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { AttachmentService } from '../services/attachment.service';
import { Router } from '@angular/router';
import { FileSizePipe } from '../pipes/file-size.pipe';

@Component({
  standalone: true,
  selector: 'app-expense-list',
  imports: [CommonModule, FormsModule, FileSizePipe],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Expenses</h4>
      <div>
        <input
          class="form-control form-control-sm"
          style="width:260px;display:inline-block"
          placeholder="Filter by category/desc"
          [(ngModel)]="q"
          (input)="applyFilter()" />
        <button class="btn btn-primary btn-sm ms-2" (click)="create()">Create</button>
      </div>
    </div>

    <table class="table table-hover">
      <thead class="table-light">
        <tr>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Description</th>
          <th>Attachments</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let e of paged">
          <td><strong>{{ e.category }}</strong></td>
          <td>{{ e.date | date:'mediumDate' }}</td>
          <td>₹{{ e.amount }}</td>
          <td>{{ e.description }}</td>
          <td>
            <small *ngIf="(attachmentsMap.get(e.expenseId) || []).length === 0">0</small>
            <small *ngIf="(attachmentsMap.get(e.expenseId) || []).length > 0">
              {{ (attachmentsMap.get(e.expenseId) || []).length }} file(s)
            </small>
          </td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary me-1" (click)="edit(e.expenseId)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" (click)="confirmDelete(e.expenseId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav *ngIf="pages > 1" aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li class="page-item" [class.disabled]="page===1"><a class="page-link" (click)="setPage(page-1)">Prev</a></li>
        <li class="page-item" *ngFor="let p of pageNumbers" [class.active]="p===page"><a class="page-link" (click)="setPage(p)">{{p}}</a></li>
        <li class="page-item" [class.disabled]="page===pages"><a class="page-link" (click)="setPage(page+1)">Next</a></li>
      </ul>
    </nav>
  `
})
export class ExpenseListComponent implements OnInit {
  list: any[] = [];
  filtered: any[] = [];
  paged: any[] = [];
  q = '';
  page = 1;
  pageSize = 8;
  pages = 1;
  pageNumbers: number[] = [];
  attachmentsMap = new Map<number, any[]>();

  constructor(
    private expenseSvc: ExpenseService,
    private attachSvc: AttachmentService,
    private router: Router
  ) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.expenseSvc.getAll().subscribe(list => {
      this.list = list;
      // load attachments counts for each
      list.forEach(e => {
        if (e.expenseId !== undefined) {
          this.loadAttachments(e.expenseId);
        }
      });
      this.applyFilter();
    });
  }

  loadAttachments(expenseId: number) {
    this.attachSvc.list(expenseId).subscribe(list => this.attachmentsMap.set(expenseId, list), () => this.attachmentsMap.set(expenseId, []));
  }

  applyFilter() {
    const q = (this.q || '').toLowerCase();
    this.filtered = this.list.filter(e =>
      !q || (e.category || '').toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q)
    );
    this.page = 1;
    this.updatePaging();
  }

  updatePaging() {
    this.pages = Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    this.pageNumbers = Array.from({length: this.pages}, (_,i)=>i+1);
    this.setPage(this.page);
  }

  setPage(p: number) {
    if (p < 1) p = 1;
    if (p > this.pages) p = this.pages;
    this.page = p;
    const start = (p-1)*this.pageSize;
    this.paged = this.filtered.slice(start, start + this.pageSize);
  }

  create() { this.router.navigate(['/expenses/create']); }
  edit(id: number) { this.router.navigate(['/expenses/edit', id]); }

  confirmDelete(id: number) {
    if (!confirm('Delete this expense?')) return;
    this.expenseSvc.delete(id).subscribe(() => {
      this.list = this.list.filter(x => x.expenseId !== id);
      this.applyFilter();
    }, err => alert('Delete failed'));
  }
}
