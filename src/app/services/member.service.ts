// src/app/services/member.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Member {
  memberId: number;
  societyId?: number;
  fullName: string;
  email?: string;
  phone?: string;
  flatNumber?: string;
  memberType?: string;
  isActive: boolean;
  joinDate?: string;
}

@Injectable({ providedIn: 'root' })
export class MemberService {
  private apiUrl = 'https://localhost:7242/api/members';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  getById(id: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/${id}`);
  }

  create(model: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, model);
  }

  update(id: number, model: Member): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, model);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
