import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { getFullname } from '../../../../../helpers';
import { User, ApiResponse } from '../../../../../models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {

  @Input() record: User;
  getFullname = getFullname;

  constructor(
    private router: Router,
    ) {
  }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

}
