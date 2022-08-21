import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { IPersonalInfo } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {

  aboutInfo:IPersonalInfo['about_me'] = '';
  

  constructor(
    private service:PersonalInfoService
  ) { }

  ngOnInit(): void {
    this.service.getPersonalInfo().subscribe((data) => {
      this.aboutInfo = data[0].about_me;
    });
  }

}
