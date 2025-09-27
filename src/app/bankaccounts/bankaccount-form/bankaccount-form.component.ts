// src/app/bankaccounts/bank-account-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BankAccountService, BankAccount } from '../../services/bankaccount.service';

@Component({
  standalone: true,
  selector: 'app-bank-account-form',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './bankaccount-form.component.html',
  styleUrls: ['./bankaccount-form.component.css']
})
export class BankaccountFormComponent implements OnInit {
  id?: number;
  model: BankAccount = { bankAccountId: 0, isActive: true };

  constructor(private service: BankAccountService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.getById(this.id).subscribe(res => this.model = res);
    }
  }

  save() {
    if (this.id) {
      this.service.update(this.id, this.model).subscribe(() => this.router.navigate(['/bankaccounts']));
    } else {
      this.service.create(this.model).subscribe(() => this.router.navigate(['/bankaccounts']));
    }
  }
}
