import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AttachmentService {
  constructor(private http: HttpClient) {}

  list(expenseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/expenses/${expenseId}/attachments`);
  }

  upload(expenseId: number, file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(`${environment.apiBaseUrl}/api/expenses/${expenseId}/attachments`, fd);
  }

  download(expenseId: number, attachmentId: number) {
    return this.http.get(`${environment.apiBaseUrl}/api/expenses/${expenseId}/attachments/${attachmentId}`, { responseType: 'blob' });
  }

  delete(expenseId: number, attachmentId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/expenses/${expenseId}/attachments/${attachmentId}`);
  }
}
