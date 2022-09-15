import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { objFormNotEmpty } from 'src/app/helpers/objectForm';
import { LoginService } from 'src/app/services/login.service';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { IPersonalInfo } from 'src/interfaces/interfaces';
import { InfoContactComponent } from '../info-contact/info-contact.component';
import { UserService } from 'src/app/services/user.service';
import { ProfileDto } from 'src/model/profile-dto';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  formInfo: FormGroup;
  editBanner: boolean =false;
  editPersonalInfo: boolean =false;
  loggedIn: boolean = false;
  private idUser: number;
  private username: string|null;

  personalInfo:IPersonalInfo = {} as IPersonalInfo  ;
  

  constructor(
    private loginService: LoginService,
    private service:PersonalInfoService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog
  ) { 
    
    this.loginService.loggedIn.subscribe(res => this.loggedIn = res);
    
    this.service.getPersonalInfo().subscribe((data) => {
      this.personalInfo = data[0];
    });
    if(this.loggedIn){
      this.username = window.sessionStorage.getItem('AuthUsername');
      this.userService.getUserByUsername(this.username as string).subscribe(res => this.idUser = res.id);
    }
  }
  
  ngOnInit(): void {
    
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.formInfo = this.formBuilder.group({
      profileImage: [this.personalInfo.profileImage, [Validators.required]],
      name: [this.personalInfo.name,[Validators.required]],
      lastName: [this.personalInfo.lastName,[Validators.required]],
      bannerImage: [this.personalInfo.bannerImage,[Validators.pattern(reg), Validators.required]],
      logo: [this.personalInfo.bannerImage,[Validators.pattern(reg), Validators.required]],
      telephone: [this.personalInfo.telephone,[Validators.required]],
      email: [this.personalInfo.email,[Validators.required]],
      title: [this.personalInfo.title,[Validators.required]],
      province: [this.personalInfo.province,[Validators.required]],
      country: [this.personalInfo.country,[Validators.required]]
    })
    
  }

  editBannerImageButton(){
    this.editBanner = !this.editBanner;
    this.formInfo.reset();
  }

  editPersonalInfoButton(){
    this.editPersonalInfo = !this.editPersonalInfo;
    this.formInfo.reset();
  }

  onEnviarBanner(event:Event){
    event.preventDefault();
    this.onEnviarForm();
    this.editBannerImageButton();
  }

  onEnviarInfo(event: Event) {
    event.preventDefault();
    this.onEnviarForm();
    this.editPersonalInfoButton();
  }

  onEnviarForm(){
    const obj = objFormNotEmpty(this.formInfo.value);
    this.personalInfo = {...this.personalInfo, ...obj}; 
    const profileToPost = new ProfileDto(this.personalInfo.bannerImage, this.personalInfo.profileImage, this.personalInfo.name, this.personalInfo.lastName, this.personalInfo.title, this.personalInfo.province, this.personalInfo.country, this.personalInfo.telephone, this.personalInfo.email, this.personalInfo.aboutMe, this.personalInfo.logo, this.idUser);
    this.service.putPersonalInfo(profileToPost, this.personalInfo.id);
  }

  openDialog(): void {
    this.dialog.open(InfoContactComponent, {
      width: '350px',
      data: {
        email: this.personalInfo.email,
        telephone: this.personalInfo.telephone
      },
      
    });
  }

}
