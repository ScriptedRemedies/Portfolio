import {Component, AfterViewInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import TypeIt from 'typeit';
import {SkillsComponent} from './skills/skills.component';
import {NgIf} from '@angular/common';
import {CustomCursorDirective} from './shared/custom-cursor.directive';
import {ProjectsComponent} from './projects/projects.component';
import {HeaderComponent} from './header/header.component';
import {HeaderService} from './shared/header.service';
import {AboutComponent} from './about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    SkillsComponent,
    NgIf,
    CustomCursorDirective,
    ProjectsComponent,
    HeaderComponent,
    AboutComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('intro', { static: false }) intro!: ElementRef<HTMLElement>;
  @ViewChild('crtScreen', { static: false }) crtScreen!: ElementRef<HTMLDivElement>;

  // TODO: Return "showOverlay" to true when want animation to show
  showOverlay = false;
  isOff = false;

  private sections: Array<{ el: HTMLElement; text: string }> = [];
  private lastIndex = -1;

  constructor(private headerService: HeaderService) {}

  async ngAfterViewInit() {
    // 1) Kick off JS flicker
    this.startFlicker();

    // 2) Wait a tick so <p #intro> is in DOM
    await this.delay(0);

    // 3) Run TypeIt
    await new Promise<void>(resolve => {
      new TypeIt(this.intro.nativeElement, {
        speed: 45,
        afterComplete: () => resolve()
      })
        .type('What happens')
        .pause(100)
        .type(' when you give a creatively obsessed ')
        .pause(200)
        .type(' full-stack developer ')
        .pause(400)
        .type(' a laptop?')
        .break({ delay: 300 })
        .type('>')
        .go();
    });

    // 4) Pause so final text lingers
    await this.delay(2000);

    // 5) Power‐off collapse
    this.isOff = true;

    // 6) After collapse finishes, hide overlay → show real content
    await this.delay(1000);
    this.showOverlay = false;

    await this.delay(0);

    // Collect all the sections once the view is initialized
    this.sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-header]')
    ).map(el => ({
      el,
      text: el.dataset['header']!
    }));

    console.log('🍀 Collected sections:', this.sections.map(s => s.text));

    // Trigger immediately on load
    this.onScroll();
  }

  private startFlicker() {
    const el = this.crtScreen.nativeElement;
    const flicker = () => {
      const t = Math.random() * 200;      // 0–200ms
      const o = 0.95 + Math.random() * 0.1; // opacity 0.9–1.0
      el.style.opacity = o.toString();
      setTimeout(flicker, t);
    };
    flicker();
  }

  private delay(ms: number) {
    return new Promise<void>(res => setTimeout(res, ms));
  }

  //@HostListener('window:scroll', [])
  onScroll() {
    const mid = window.innerHeight / 2;
    let bestDist = Infinity;
    let bestIndex = -1;

    this.sections.forEach(({ el }, i) => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - mid);
      if (dist < bestDist) {
        bestDist = dist;
        bestIndex = i;
      }
    });

    // only if the “winner” changed do we animate
    if (bestIndex !== this.lastIndex) {
      this.lastIndex = bestIndex;
      const text = this.sections[bestIndex].text;
      this.headerService.show(text);
    }
  }
}
