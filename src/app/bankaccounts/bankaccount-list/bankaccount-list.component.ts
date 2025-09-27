// src/app/bankaccounts/bank-account-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BankAccountService, BankAccount } from '../../services/bankaccount.service';

@Component({
  standalone: true,
  selector: 'app-bank-account-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './bankaccount-list.component.html',
  styleUrls: ['./bankaccount-list.component.css']
})
export class BankaccountListComponent implements OnInit {
  data: BankAccount[] = [];
  filtered: BankAccount[] = [];
  q = '';

  constructor(private service: BankAccountService, private router: Router) {}
  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(res => {
      this.data = res;
      this.filtered = res;
    });
  }

  applyFilter() {
    const q = this.q.toLowerCase();
    this.filtered = this.data.filter(x => x.bankName?.toLowerCase().includes(q));
  }

  create() { this.router.navigate(['/bankaccounts/create']); }
  edit(id: number) { this.router.navigate(['/bankaccounts/edit', id]); }
  remove(id: number) {
    if (confirm('Delete this account?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
