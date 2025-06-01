import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomCursor]',
  standalone: true
})
export class CustomCursorDirective implements OnInit {
  private cursorEl!: HTMLElement;
  private isTouch = false;

  constructor(
    private renderer: Renderer2,
    private host: ElementRef<HTMLElement>
  ) {}

  ngOnInit() {
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (this.isTouch) {
      return;
    }
    this.renderer.setStyle(this.host.nativeElement, 'cursor', 'none');
    this.cursorEl = this.renderer.createElement('div');
    this.renderer.addClass(this.cursorEl, 'custom-cursor');
    this.renderer.appendChild(document.body, this.cursorEl);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    // instead of overwriting transform, just set left/top
    this.renderer.setStyle(this.cursorEl, 'left', `${e.clientX}px`);
    this.renderer.setStyle(this.cursorEl, 'top',  `${e.clientY}px`);

    // spawn the trail (no changes needed for the trail if it’s fading)
    const trail = this.renderer.createElement('div');
    this.renderer.addClass(trail, 'cursor-trail');
    this.renderer.appendChild(document.body, trail);
    this.renderer.setStyle(trail, 'left', `${e.clientX}px`);
    this.renderer.setStyle(trail, 'top',  `${e.clientY}px`);
    setTimeout(() => this.renderer.removeChild(document.body, trail), 600);
  }
}

