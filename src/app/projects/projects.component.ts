import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

interface ResourceBox {
  title: string;
  description: string;
  linkText?: string;
  linkUrl?: string;
  imageUrl: string;
  randomWidth?: string;
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
      linkUrl: 'https://pantrypalapp.net'
    },
    {
      title: 'World Map',
      imageUrl: 'assets/images/worldMap.png',
      description:
      'This world map retrieves information from the World Bank api as each country is hovered over.',
      linkText: 'View Web App',
      linkUrl: 'test'
    }

  ];

  ngOnInit() {
    this.boxes.forEach((box) => {
      const pct = (Math.random() * 25 + 25).toFixed(2);
      box.randomWidth = `${pct}%`;
    })
  }
}
