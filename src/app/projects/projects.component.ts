import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

interface ResourceBox {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl: string;
  randomWidth?: string;
  ratio: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [NgForOf, NgIf, NgStyle],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  boxes: ResourceBox[] = [
    {
      title: 'Pantry Pal',
      imageUrl: 'assets/images/pantryPal.png',
      description:
        'Pantry Pal is a full-stack meal-planning app with an Angular frontend and Spring Boot backend that lets users add recipes, schedule them on a calendar, and automatically generate a consolidated shopping list.',
      linkText: 'View Web App',
      linkUrl: 'https://pantrypalapp.net',
      ratio: '4/3'
    },
    {
      title: 'World Map',
      imageUrl: 'assets/images/worldMap.png',
      description:
      'This world map retrieves information from the World Bank api as each country is hovered over.',
      linkText: 'View Web App',
      linkUrl: 'test',
      ratio: '1.65/1'
    },
    {
      title: 'World Map',
      imageUrl: 'assets/images/worldMap.png',
      description:
        'This world map retrieves information from the World Bank api as each country is hovered over.',
      linkText: 'View Web App',
      linkUrl: 'test',
      ratio: '1.65/1'
    }

  ];

  ngOnInit() {
    this.boxes.forEach((box) => {
      // Pick a random value between 40 and 80:
      const min = 60;
      const max = 80;
      const vw = Math.random() * (max - min) + min;
      box.randomWidth = `${vw.toFixed(2)}vw`;
    });

  }
}
