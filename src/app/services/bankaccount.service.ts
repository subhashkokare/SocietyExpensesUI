// src/app/services/bank-account.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BankAccount {
  bankAccountId: number;
  bankName?: string;
  accountNumberMasked?: string;
  ifsc?: string;
  balance?: number;
  isActive: boolean;
}

@Injectable({ providedIn: 'root' })
export class BankAccountService {
  private apiUrl = 'https://localhost:7242/api/bankaccounts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(this.apiUrl);
  }

  getById(id: number): Observable<BankAccount> {
    return this.http.get<BankAccount>(`${this.apiUrl}/${id}`);
  }

  create(model: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(this.apiUrl, model);
  }

  update(id: number, model: BankAccount): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
