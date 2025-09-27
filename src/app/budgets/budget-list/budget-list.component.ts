import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BudgetService, Budget } from '../../services/budget.service';

@Component({
  standalone: true,
  selector: 'app-budget-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css']
})
export class BudgetListComponent implements OnInit {
  data: Budget[] = [];
  filtered: Budget[] = [];
  q = '';

  constructor(private svc: BudgetService, private router: Router) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.svc.getAll().subscribe(res => {
      this.data = res || [];
      this.filtered = [...this.data];
    });
  }

  applyFilter() {
    const q = (this.q || '').toLowerCase();
    this.filtered = this.data.filter(b =>
      !q ||
      b.category?.toLowerCase().includes(q) ||
      String(b.year).includes(q)
    );
  }

  create() { this.router.navigate(['/budgets/create']); }
  edit(id: number) { this.router.navigate(['/budgets/edit', id]); }
  remove(id: number) {
    if (!confirm('Delete this budget?')) return;
    this.svc.delete(id).subscribe(() => this.load(), () => alert('Delete failed'));
  }
}
