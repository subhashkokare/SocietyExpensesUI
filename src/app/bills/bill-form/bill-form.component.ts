// src/app/bills/bill-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BillService, Bill } from '../../services/bill.service';
import { MemberService, Member } from '../../services/member.service';

@Component({
  standalone: true,
  selector: 'app-bill-form',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl:'./bill-form.component.html',
  styleUrls:['bill-form.component.css']
})
export class BillFormComponent implements OnInit {
  id?: number;
  model: Bill = { billId: 0, memberId: 0 };
  members: Member[] = [];

  constructor(
    private service: BillService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.memberService.getAll().subscribe(res => this.members = res);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.getById(this.id).subscribe(res => {
        res.periodStart = res.periodStart?.split('T')[0];
        res.periodEnd = res.periodEnd?.split('T')[0];
        res.dueDate = res.dueDate?.split('T')[0];
        this.model = res;
      });
    }
  }

  save() {
    if (this.id) {
      this.service.update(this.id, this.model).subscribe(() => this.router.navigate(['/bills']));
    } else {
      this.service.create(this.model).subscribe(() => this.router.navigate(['/bills']));
    }
  }
}
