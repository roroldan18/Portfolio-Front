import { Component, OnInit } from '@angular/core';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { IPersonalInfo } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  personalInfo:IPersonalInfo = {
    idProfile: '',
    idUser: '',
    banner_image: '',
    profile_image: '',
    name: '',
    last_name: '',
    email: '',
    title: '',
    province: '',
    country: '',
    about_me: '',
    logo: '',
  };
  

  constructor(
    private service:PersonalInfoService
  ) { }

  ngOnInit(): void {
    this.service.getPersonalInfo().subscribe((data) => {
      this.personalInfo = data[0];
    });
  }

}
