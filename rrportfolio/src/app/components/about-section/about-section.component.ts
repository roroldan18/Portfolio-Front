import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { IPersonalInfo } from 'src/interfaces/interfaces';
import { LoginService } from '../../services/login.service';
import { ProfileDto } from 'src/model/profile-dto';
import { UserService } from 'src/app/services/user.service';
import { Alerts } from 'src/model/Alerts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {
  formAbout: FormGroup;
  editAbout: boolean = false;
  loggedIn: boolean = false;
  personalInfo: IPersonalInfo = {} as IPersonalInfo;
  private idUser: number;
  private username: string|null;

  constructor(
    private personalInfoService:PersonalInfoService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private loginService: LoginService
  ) { 
    this.formAbout = this.formBuilder.group({
      aboutMe: ['',[Validators.required, Validators.maxLength(255)]],
    })

    this.loginService.loggedIn.subscribe(res => this.loggedIn = res);

    
  }
  
  ngOnInit(): void {
    if(this.loggedIn){
      this.username = window.sessionStorage.getItem('AuthUsername');
      this.userService.getUserByUsername(this.username as string).subscribe(res => this.idUser = res.id);
    }

    this.personalInfoService.getPersonalInfo().subscribe((data) => {
      this.personalInfo = data[0];
    });
  }

  onClickEdit(){
    this.editAbout = !this.editAbout;
    this.formAbout.reset();
  }
  
  onEnviarAbout(event: Event) {
    event.preventDefault();
    if(this.formAbout.valid){
      const aboutToPut = new ProfileDto(this.personalInfo.bannerImage, this.personalInfo.profileImage, this.personalInfo.name, this.personalInfo.lastName, this.personalInfo.title, this.personalInfo.province, this.personalInfo.country, this.personalInfo.telephone, this.personalInfo.email, this.formAbout.value.aboutMe,this.personalInfo.logo, this.idUser);
      this.personalInfoService.putPersonalInfo(aboutToPut, this.personalInfo.id).subscribe( (response) => {
        new Alerts('success', 'Edited!', `About Me edited`);
        this.personalInfo.aboutMe = this.formAbout.value.aboutMe;
        this.onClickEdit();
      },
        (error: HttpErrorResponse) => {
          new Alerts('error').showError();
        }
      );

    } else {
      this.formAbout.markAllAsTouched();
    }
  }



}
