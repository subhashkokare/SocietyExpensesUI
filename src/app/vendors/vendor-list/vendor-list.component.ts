// src/app/vendors/vendor-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { VendorService } from '../../services/vendor.service';

@Component({
  standalone: true,
  selector: 'app-vendor-list',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  data: any[] = [];
  filtered: any[] = [];
  q = '';

  constructor(private service: VendorService, private router: Router) {}
  ngOnInit() { this.load(); }

  load() {
    this.service.getAll().subscribe(res => {
      this.data = res;
      this.filtered = res;
    });
  }

  applyFilter() {
    const q = this.q.toLowerCase();
    this.filtered = this.data.filter(x =>
      x.name?.toLowerCase().includes(q) ||
      x.contactPerson?.toLowerCase().includes(q) ||
      x.phone?.toLowerCase().includes(q)
    );
  }

  create() { this.router.navigate(['/vendors/create']); }
  edit(id: number) { this.router.navigate(['/vendors/edit', id]); }
  remove(id: number) {
    if (confirm('Delete this vendor?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
