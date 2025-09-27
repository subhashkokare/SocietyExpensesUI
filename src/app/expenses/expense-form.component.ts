// src/app/expenses/expense-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { AttachmentService } from '../services/attachment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSizePipe } from "../pipes/file-size.pipe";

@Component({
  standalone: true,
  selector: 'app-expense-form',
  imports: [CommonModule, FormsModule, FileSizePipe],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  model: any = { category: '', date: '', amount: null, paymentMode: '', description: '' };
  isEdit = false;
  selectedFile?: File;
  attachments: any[] = [];

  constructor(
    private expenseSvc: ExpenseService,
    private attachSvc: AttachmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.expenseSvc.get(+id).subscribe(e => {
        e.date = e.date ? e.date.split('T')[0] : '';
        this.model = e;
        this.loadAttachments(e.expenseId);
      });
    }
  }

  onFileChange(e: any) { this.selectedFile = e.target.files && e.target.files[0]; }

  save() {
    if (this.isEdit) {
      this.model.date = new Date(this.model.date).toISOString();  // ensure proper format
      this.expenseSvc.update(this.model.expenseId, this.model).subscribe(() => {
        if (this.selectedFile) this.uploadFile(this.model.expenseId);
        alert('Updated'); this.router.navigate(['/expenses']);
      });
    } else {
      this.expenseSvc.create(this.model).subscribe(exp => {
        if (this.selectedFile) this.uploadFile(exp.expenseId??0);
        alert('Created'); this.router.navigate(['/expenses']);
      });
    }
  }

  uploadFile(expenseId: number) {
    if (!this.selectedFile) return;
    this.attachSvc.upload(expenseId, this.selectedFile).subscribe(() => {
      this.loadAttachments(expenseId);
      this.selectedFile = undefined;
    }, () => alert('Upload failed'));
  }

  loadAttachments(expenseId: number) {
    this.attachSvc.list(expenseId).subscribe(list => this.attachments = list);
  }

  deleteAttachment(attachmentId: number) {
    if (!confirm('Delete attachment?')) return;
    const id = this.model.expenseId;
    this.attachSvc.delete(id, attachmentId).subscribe(() => this.loadAttachments(id));
  }

  cancel() { this.router.navigate(['/expenses']); }
}
