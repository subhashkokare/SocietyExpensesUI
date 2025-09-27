import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalExpenses = 0;
  expenseCount = 0;
  attachmentCount = 0;
  recentExpenses: any[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getAll().subscribe(data => {
      this.expenseCount = data.length;
      this.totalExpenses = data.reduce((sum, e) => sum + (e.amount ?? 0), 0);
      this.attachmentCount = data.reduce((sum, e) => sum + (e.attachments?.length ?? 0), 0);
      this.recentExpenses = data.slice(-5).reverse(); // last 5
    });
  }
}
