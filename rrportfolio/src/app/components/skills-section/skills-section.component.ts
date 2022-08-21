import { Component, OnInit } from '@angular/core';
import { SkillsService } from 'src/app/services/skills.service';
import { ISkill } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit {
  skills:ISkill[] = [];

  constructor(
    private skillService: SkillsService
  ) { }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
    })
  }

}
