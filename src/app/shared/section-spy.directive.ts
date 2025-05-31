// src/app/shared/section-spy.directive.ts
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { HeaderService } from './header.service';

@Directive({
  selector: '[appSectionSpy]',
  standalone: true
})
export class SectionSpyDirective implements AfterViewInit, OnDestroy {
  @Input('appSectionSpy') heading = '';
  private io!: IntersectionObserver;

  constructor(
    private host: ElementRef<HTMLElement>,
    private headerSvc: HeaderService
  ) {}

  ngAfterViewInit() {
    // observe the tiny sentinel inside this host
    const sentinel = this.host.nativeElement.querySelector('.spy-sentinel')!;
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.headerSvc.show(this.heading);
        }
      },
      {
        root: null,
        // move the “viewport” so its middle line is the trigger zone
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );
    this.io.observe(sentinel);
  }

  ngOnDestroy() {
    this.io.disconnect();
  }
}
