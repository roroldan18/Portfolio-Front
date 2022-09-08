import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonalInfoService } from 'src/app/services/personal-info.service';
import { IPersonalInfo } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.css']
})
export class AboutSectionComponent implements OnInit {
  formAbout: FormGroup;
  aboutInfo:IPersonalInfo['about_me'] = '';
  editAbout: boolean = false;

  constructor(
    private service:PersonalInfoService,
    private formBuilder: FormBuilder,
  ) { 
    this.formAbout = this.formBuilder.group({
      aboutText: ['',[Validators.required, Validators.maxLength(255)]],
    })
  }

  ngOnInit(): void {
    this.service.getPersonalInfo().subscribe((data) => {
      this.aboutInfo = data[0].about_me;
    });
  }

  onClickEdit(){
    this.editAbout = !this.editAbout;
    this.formAbout.reset();
  }
  
  onEnviarAbout(event: Event) {
    event.preventDefault();
    if(this.formAbout.valid){
      this.aboutInfo = this.formAbout.value.aboutText;
      this.onClickEdit();
    } else {
      this.formAbout.markAllAsTouched();
    }
  }



}
