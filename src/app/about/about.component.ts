import { Component } from '@angular/core';

interface TvScreen {
  image: string;
  heading: string;
  text: string;
}

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
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
        <br>Front‐end: Angular, TypeScript, SCSS, responsive design, and UI/UX best practices.
        <br>Back‐end: Java with Spring Boot, RESTful API design, Node.js with Express, and database design (MySQL).
        <br>DevOps & Tools: Git/GitHub workflows, Docker containerization, and AWS EC2/Firebase hosting.
        <br>I’m always eager to dive into new languages or frameworks.
      `.trim()
    },
    {
      image: '/assets/images/fordPicture.png',
      heading: `Professional Experience`,
      text: `
        During my time at university, I’ve:
        <br>Developed “Pantry Pal”, a full‐stack meal‐planning web app (Angular + Spring Boot) that generates shopping lists automatically;
        <br>Redesigned websites for family owned businesses in my community.
        <br>Created curriculum and taught a web design class for 8th grade students.
        <br>Through these experiences, I’ve learned how to communicate problems and solutions effectively.
      `.trim()
    },
    {
      image: '/assets/images/guitar.png',
      heading: `Beyond Code`,
      text: `
        When I’m not writing or debugging code, you’ll often find me:
        <br>Playing guitar and writing small “web-powered” music theory tools in JavaScript;
        <br>Staying active outdoors — hiking Arizona trails, mountain biking, or camping in Arizona’s national parks.
        <br>I care deeply about clean code, lifelong learning, and giving back. Whether I’m mentoring a new generation or I'm giving back to someone in need, I’m always excited to share knowledge and connect with other curious minds.
      `.trim()
    }
  ]

  currentIndex = 0;

  innerSrc = this.screens[0].image;

  textVisible = true;

  get currentScreen(): TvScreen {
    return this.screens[this.currentIndex];
  }

  onTvClick() {
    this.textVisible = false;

    setTimeout(() => {
      this.innerSrc = this.innerStaticGif;

      // 2. After a short delay, advance to the next screen
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.screens.length;
        this.innerSrc = this.screens[this.currentIndex].image;
        this.textVisible = true;
      }, 600);
    }, 300);

  }
}
