import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BudgetService, Budget } from '../../services/budget.service';

@Component({
  standalone: true,
  selector: 'app-budget-form',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  id?: number;
  model: Partial<Budget> = { year: new Date().getFullYear(), category: '', amount: 0 };

  constructor(private svc: BudgetService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.svc.getById(this.id).subscribe(b => this.model = b || this.model);
    }
  }

  save() {
    if (this.id) {
      this.svc.update(this.id, this.model).subscribe(() => this.router.navigate(['/budgets']), () => alert('Save failed'));
    } else {
      this.svc.create(this.model).subscribe(() => this.router.navigate(['/budgets']), () => alert('Save failed'));
    }
  }
}
