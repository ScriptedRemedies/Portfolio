// header.component.ts
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderService } from '../shared/header.service';

@Component({
  selector: 'app-header',
  template: `<h2 #hdr class="global-header"></h2>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('hdr', { static: true }) hdr!: ElementRef<HTMLElement>;

  constructor(private headerSvc: HeaderService) {}

  ngAfterViewInit() {
    this.headerSvc.init(this.hdr.nativeElement);
  }
}
