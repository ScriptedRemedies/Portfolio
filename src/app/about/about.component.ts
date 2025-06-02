import { Component, OnInit, OnDestroy } from '@angular/core';

interface TvScreen {
  image: string;
  heading: string;
  text: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  innerStaticGif = '/assets/images/oldTv.gif';

  screens: TvScreen[] = [
    {
      image: '/assets/images/me-background.png',
      heading: `Hi, I'm Sam.`,
      text: `
        I’m a passionate full‐stack developer based in Scottsdale, Arizona.
        Ever since building my first simple website in high school, I’ve been fascinated
        by the way code can solve real‐world problems and bring ideas to life.
        On any given day, you’ll find me experimenting with new frameworks,
        refactoring old codebases, or working with the others around me to build
        something useful from scratch.
      `.trim()
    },
    {
      image: '/assets/images/burger.png',
      heading: `Over the Years`,
      text: `
        I’ve honed a broad set of technical skills:
        Front‐end: Angular, TypeScript, SCSS, responsive design, and UI/UX best practices.
        Back‐end: Java with Spring Boot, RESTful API design, and database design (MySQL).
        DevOps & Tools: Git/GitHub workflows, Docker containerization, and AWS EC2/Firebase hosting.
        I’m always eager to dive into new languages or frameworks.
      `.trim()
    },
    {
      image: '/assets/images/fordPicture.png',
      heading: `Professional Experience`,
      text: `
        During my time at university, I’ve:
        Developed “Pantry Pal”, a full‐stack meal‐planning web app (Angular + Spring Boot) that generates shopping lists automatically.
        Redesigned websites for family-owned businesses in my community.
        Created curriculum and taught a web design class for 8th grade students.
        Through these experiences, I’ve learned how to communicate problems and solutions effectively.
      `.trim()
    },
    {
      image: '/assets/images/guitar.png',
      heading: `Beyond Code`,
      text: `
        When I’m not writing or debugging code, you’ll often find me:
        Playing guitar and writing small “web-powered” music theory tools in JavaScript;
        Staying active outdoors — hiking Arizona trails, mountain biking, or camping in Arizona’s national parks.
        I care deeply about clean code, lifelong learning, and giving back. Whether I’m mentoring a new generation or I'm giving back to someone in need, I’m always excited to share knowledge and connect with other curious minds.
      `.trim()
    }
  ];

  currentIndex = 0;

  // This drives the <img [src]="innerSrc">. We start at screen 0’s image.
  innerSrc = this.screens[0].image;

  // Controls whether the heading/text is visible (for fade-in/out logic)
  textVisible = true;

  // A flag so we don’t try to flicker twice at once
  private isFlickering = false;

  // Keep references to timeouts so we can clear them on destroy
  private flickerTimeout: any;
  private recoverTimeout: any;

  ngOnInit() {
    // Kick off the first random flicker
    this.scheduleNextFlicker();
  }

  ngOnDestroy() {
    // Clean up any pending timeouts
    clearTimeout(this.flickerTimeout);
    clearTimeout(this.recoverTimeout);
  }

  get currentScreen(): TvScreen {
    return this.screens[this.currentIndex];
  }

  onTvClick() {
    // Hide text first
    this.textVisible = false;

    // After 300ms, swap to static GIF, then move to next slide
    setTimeout(() => {
      this.innerSrc = this.innerStaticGif;

      setTimeout(() => {
        // Advance to the next screen
        this.currentIndex = (this.currentIndex + 1) % this.screens.length;
        // Show the actual next screen image
        this.innerSrc = this.screens[this.currentIndex].image;
        this.textVisible = true;
      }, 600);
    }, 300);
  }

  /**
   * Pick a random delay between minMs and maxMs
   */
  private randomBetween(minMs: number, maxMs: number): number {
    return minMs + Math.random() * (maxMs - minMs);
  }

  /**
   * Schedules the next “flicker” at a random interval.
   */
  private scheduleNextFlicker() {
    // If we’re already flickering, skip scheduling
    if (this.isFlickering) return;

    // Wait between 3 → 7 seconds before flickering
    const delay = this.randomBetween(3000, 7000);

    this.flickerTimeout = setTimeout(() => {
      this.doFlickerOnce();
    }, delay);
  }

  /**
   * Do one brief “static” flicker, then restore the real image.
   */
  private doFlickerOnce() {
    // If the user is currently in the middle of a click‐driven transition, skip
    if (!this.textVisible) {
      // Wait a short moment and try again
      this.scheduleNextFlicker();
      return;
    }

    this.isFlickering = true;

    // Save whatever the “actual” image is right now
    const original = this.innerSrc;

    // 1) Switch to static GIF
    this.innerSrc = this.innerStaticGif;

    // 2) After a very short time (e.g. 100ms), restore the original image
    this.recoverTimeout = setTimeout(() => {
      this.innerSrc = original;
      this.isFlickering = false;
      // Schedule the next random flicker
      this.scheduleNextFlicker();
    }, 100); // flicker duration (adjust to taste, e.g. 50–200ms)
  }
}
