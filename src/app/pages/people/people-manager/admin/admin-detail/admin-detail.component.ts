
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../../../../../models';
import { Admins } from '../../../../../providers';
import { getFullname } from '../../../../../helpers';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
})
export class AdminDetailComponent implements OnInit {

  @Input() record: Admin;
  getFullname = getFullname;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public admins: Admins) {
  }


  ngOnInit() {
    // if (this.record) return;
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // if (!id) return;
    // [this.record] = this.admins.query({ id });
    // if (this.record) return;
    // this.admins.recordRetrieve(`?_id=${id}`).then(res => {
    //   this.record = res.payload[0];
    //   if (!this.record) this.goBack();
    // });
  }

  goBack() {
    window.history.back();
  }

}
