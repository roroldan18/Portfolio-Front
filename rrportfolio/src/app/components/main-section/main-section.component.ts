import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { objFormNotEmpty } from 'src/app/helpers/objectForm';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { IPersonalInfo } from 'src/interfaces/interfaces';
import { InfoContactComponent } from '../info-contact/info-contact.component';


@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {
  formUrl: FormGroup;
  formInfo: FormGroup;
  editBanner: boolean =false;
  editPersonalInfo: boolean =false;

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
    private service:PersonalInfoService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { 
    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formUrl = this.formBuilder.group({
      banner_image: ['',[Validators.pattern(reg), Validators.required]],
    })

    this.formInfo = this.formBuilder.group({
      profile_image: ['', ],
      name: ['',[]],
      last_name: ['',[]],
      email: ['',[]],
      title: ['',[]],
      province: ['',[]],
      country: ['',[]]
    })
  }

  ngOnInit(): void {
    this.service.getPersonalInfo().subscribe((data) => {
      this.personalInfo = data[0];
    });
  }

  editBannerImageButton(){
    this.editBanner = !this.editBanner;
    this.formUrl.reset();
  }

  editPersonalInfoButton(){
    this.editPersonalInfo = !this.editPersonalInfo;
    this.formInfo.reset();
  }
  
  onEnviarUrl(event: Event) {
    event.preventDefault();

    if(this.formUrl.valid){
      this.personalInfo.banner_image = this.formUrl.value.banner_image;
      this.editBannerImageButton();
    } else {
      this.formUrl.markAllAsTouched();
    }
  }

  onEnviarInfo(event: Event) {
    event.preventDefault();
    //send only the values that are not empty  
    const obj = objFormNotEmpty(this.formInfo.value);
    this.personalInfo = {...this.personalInfo, ...obj}; 
    this.editPersonalInfoButton();
  }

  openDialog(): void {
    this.dialog.open(InfoContactComponent, {
      width: '250px',
      data: {
        email: this.personalInfo.email,
      }
    });
  }

}
