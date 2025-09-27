// src/app/members/member-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../services/member.service';

@Component({
  standalone: true,
  selector: 'app-member-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  data: any[] = [];
  filtered: any[] = [];
  q = '';

  constructor(private service: MemberService, private router: Router) {}
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
      x.fullName?.toLowerCase().includes(q) ||
      x.email?.toLowerCase().includes(q) ||
      x.flatNumber?.toLowerCase().includes(q)
    );
  }

  create() { this.router.navigate(['/members/create']); }
  edit(id: number) { this.router.navigate(['/members/edit', id]); }
  remove(id: number) {
    if (confirm('Delete this member?')) {
      this.service.delete(id).subscribe(() => this.load());
    }
  }
}
