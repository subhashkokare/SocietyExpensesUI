import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Budget {
  budgetId: number;
  societyId?: number;
  year: number;
  category: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {
  private apiUrl = 'https://localhost:7242/api/budgets';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Budget[]> {
    return this.http.get<Budget[]>(this.apiUrl);
  }

  getById(id: number): Observable<Budget> {
    return this.http.get<Budget>(`${this.apiUrl}/${id}`);
  }

  create(model: Partial<Budget>): Observable<Budget> {
    return this.http.post<Budget>(this.apiUrl, model);
  }

  update(id: number, model: Partial<Budget>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
