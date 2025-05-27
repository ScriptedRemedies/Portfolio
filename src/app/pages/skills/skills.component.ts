import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  @ViewChild('scroller', { read: ElementRef }) scrollerRef!: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.initializeInfiniteScroll();
  }

  private initializeInfiniteScroll(): void {
    const scrollerEl = this.scrollerRef.nativeElement;
    scrollerEl.setAttribute('data-animated', 'true');

    const inner = scrollerEl.querySelector<HTMLElement>('.scroller__inner')!;
    const items = Array.from(inner.children);

    items.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      inner.appendChild(clone);
    });
  }
}
