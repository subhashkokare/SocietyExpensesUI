// src/app/vendors/vendor-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VendorService } from '../../services/vendor.service';

@Component({
  standalone: true,
  selector: 'app-vendor-form',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent implements OnInit {
  id?: number;
  model: any = {};

  constructor(private service: VendorService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.getById(this.id).subscribe(res => this.model = res);
    }
  }

  save() {
    if (this.id) {
      this.service.update(this.id, this.model).subscribe(() => this.router.navigate(['/vendors']));
    } else {
      this.service.create(this.model).subscribe(() => this.router.navigate(['/vendors']));
    }
  }
}
