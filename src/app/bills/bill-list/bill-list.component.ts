// src/app/bills/bill-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BillService, Bill } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-bill-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl:'./bill-list.component.html',
  styleUrls:['bill-list.component.css']
})
export class BillListComponent implements OnInit {
  data: Bill[] = [];
  filtered: Bill[] = [];
  q = '';

  constructor(private service: BillService, private router: Router) {}
  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(res => {
      this.data = res;
      this.filtered = res;
    });
  }

  applyFilter() {
    const q = this.q.toLowerCase();
    this.filtered = this.data.filter(x => x.status?.toLowerCase().includes(q));
  }

  create() { this.router.navigate(['/bills/create']); }
  edit(id: number) { this.router.navigate(['/bills/edit', id]); }
  remove(id: number) {
    if (confirm('Delete this bill?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
