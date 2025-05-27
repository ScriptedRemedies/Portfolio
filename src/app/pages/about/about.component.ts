import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgIf],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('sentinel',   { static: true }) sentinel!:   ElementRef<HTMLElement>;
  @ViewChild('crawlWrapper',{ read: ElementRef }) crawlWrapper!: ElementRef<HTMLElement>;

  playCrawl  = false;
  showReplay = false;

  ngAfterViewInit() {
    const obs = new IntersectionObserver(
      ([entry], observer) => {
        if (entry.isIntersecting) {
          this.playCrawl = true;      // now your crawl DIV appears & animates
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(this.sentinel.nativeElement);
  }

  onCrawlDone() {
    this.showReplay = true;
  }

  replay() {
    this.showReplay = false;
    this.playCrawl  = false;
    setTimeout(() => (this.playCrawl = true), 0);
  }
}
