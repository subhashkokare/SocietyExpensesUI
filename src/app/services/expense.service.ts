import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Expense {
  expenseId?: number;
  category?: string;
  date?: string;
  amount?: number;
  paymentMode?: string;
  invoiceNumber?: string;
  description?: string;
  status?: string;
  attachments?: ExpenseAttachment[];
}
export interface ExpenseAttachment {
  attachmentId: number;
  expenseId: number;
  fileName: string;
  filePath: string;
  contentType: string;
  sizeBytes: number;
  uploadedByUser: string;
  uploadedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Expense[]> { return this.http.get<Expense[]>(`${environment.apiBaseUrl}/api/expenses`); }
  create(exp: Partial<Expense>) { return this.http.post<Expense>(`${environment.apiBaseUrl}/api/expenses`, exp); }
  get(id: number) { return this.http.get<any>(`${environment.apiBaseUrl}/api/expenses/${id}`); }
  update(id: number, model: any) { return this.http.put(`${environment.apiBaseUrl}/api/expenses/${id}`, model); }
  delete(id: number) { return this.http.delete(`${environment.apiBaseUrl}/api/expenses/${id}`); }
}
