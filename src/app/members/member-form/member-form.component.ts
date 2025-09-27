// src/app/members/member-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-member-form',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  id?: number;
  model: any = { isActive: true };

  constructor(private service: MemberService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.getById(this.id).subscribe(res => {
        res.joinDate = res.joinDate?.split('T')[0];
        this.model = res;
      });
    }
  }

  save() {
    if (this.id) {
      this.service.update(this.id, this.model).subscribe(() => this.router.navigate(['/members']));
    } else {
      this.service.create(this.model).subscribe(() => this.router.navigate(['/members']));
    }
  }
}
