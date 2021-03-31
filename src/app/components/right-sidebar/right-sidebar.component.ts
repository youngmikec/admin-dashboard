import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit, OnChanges {

  @Input() zIndex: number;
  @Input() heading: string;
  @Input() alwayOpenSidebar: string;
  @ViewChild('header', null) elem: ElementRef;
  @Output() sidebarClosed = new EventEmitter<boolean>();

  prevAlwayOpenSidebar: string;
  sidebarOpen = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
      if (this.alwayOpenSidebar !== this.prevAlwayOpenSidebar) {
        this.alwayOpenSidebar = this.prevAlwayOpenSidebar;
        this.sidebarOpen = true;
      }
  }

  headerOuterHeight() {
    const header = this.elem.nativeElement;
    let height = header.offsetHeight;
    const style = getComputedStyle(header);

    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  }

  closeSidebar() {
    this.sidebarOpen = false;
    this.sidebarClosed.emit(false);
  }

}
