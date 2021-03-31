
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setting, ApiResponse } from '../../../../../models';
import { Settings } from '../../../../../providers';

@Component({
  selector: 'app-setting-detail',
  templateUrl: './setting-detail.component.html',
})
export class SettingDetailComponent implements OnInit {

  @Input() record: Setting;

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    public settings: Settings) {
    }

  ngOnInit() {
  }

  goToList(record: any): void {
    this.router.navigate([`setting`]);
  }

  goBack() {
    window.history.back();
  }

}
