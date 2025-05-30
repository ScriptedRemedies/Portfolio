import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import TypeIt from 'typeit';
import {NgIf} from '@angular/common';
import {ProjectsComponent} from './projects/projects.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    NgIf,
    ProjectsComponent
  ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('intro', { static: false }) intro!: ElementRef<HTMLElement>;
  @ViewChild('crtScreen', { static: false }) crtScreen!: ElementRef<HTMLDivElement>;

  showOverlay = true;
  isOff = false;

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
}
