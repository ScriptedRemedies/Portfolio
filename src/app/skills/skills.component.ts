import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {SectionSpyDirective} from '../shared/section-spy.directive';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  imports: [
    SectionSpyDirective

  ],
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit {

  @ViewChild('header', { static: false }) header!: ElementRef<HTMLElement>;

  async ngAfterViewInit() {

  }

}
