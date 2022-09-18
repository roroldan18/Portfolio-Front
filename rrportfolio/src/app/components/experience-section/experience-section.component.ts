import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {  unObjectExp } from 'src/app/helpers/unObject';
import { ExperiencesInfoService } from 'src/app/services/experiences-info.service';
import { IExperience } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { ExperienceDto } from 'src/model/experience-dto';
import { TokenService } from '../../services/token.service';
import { NumberSymbol } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts } from 'src/model/Alerts';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {
  addExperience: boolean = false;
  experiences: IExperience[] = [];
  loggedIn: boolean=false;
  private idUser: number;
  private username: string|null;
  
  constructor(
    private experienceService: ExperiencesInfoService,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.loginService.loggedIn.subscribe(res => this.loggedIn = res);
    if(this.loggedIn){
      this.username = window.sessionStorage.getItem('AuthUsername');
      this.userService.getUserByUsername(this.username as string).subscribe(res => this.idUser = res.id);
    }
  }
  
  ngOnInit(): void {
    this.onGetExperience();
  }

  onGetExperience(){
    this.experienceService.getExperiences().subscribe((experiences:IExperience[]) => {
      this.experiences = experiences.sort((a: IExperience, b: IExperience) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    })
  }

  onEditExperience(experience:IExperience){
    const expDto:ExperienceDto = new ExperienceDto(experience.company, experience.title, experience.description,experience.timeWork, experience.startDate, experience.endDate, experience.logo, experience.isActual, this.idUser);

    this.experienceService.putExperience(expDto, experience.id).subscribe( (response) => {
      new Alerts("success", 'Edited', `Experience: ${experience.title} in ${experience.company} edited!`).showSuccess();
      this.experiences = unObjectExp(this.experiences, experience);
    },
      (error: HttpErrorResponse) => {
        new Alerts("error").showError();
      }
    );

  }

  onAddExperienceButton() {
    this.addExperience = !this.addExperience;
  }

  onAddExperience(experience: IExperience){
    const expDto:ExperienceDto = new ExperienceDto(experience.company, experience.title, experience.description,experience.timeWork, experience.startDate, experience.endDate, experience.logo, experience.isActual, this.idUser);
    
    this.experienceService.postExperience(expDto).subscribe( (response) => {
      new Alerts('success', 'Added', `Experience: ${experience.title} in ${experience.company} added!`).showSuccess()
      this.onAddExperienceButton();
      this.experiences.push({...experience, id: response.id});
      this.experiences.sort((a: IExperience, b: IExperience) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    },
      (error: HttpErrorResponse) => {
        new Alerts('error').showError();
      }
    );
    
  }

  onDeleteExperience(id:string){
    Swal.fire({
      title: 'Seguro que deseas eliminar la experiencia?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienceService.deleteExperience(parseInt(id)).subscribe( (response) => {
          new Alerts('success', 'Deleted', 'Experience deleted').showSuccess(); 
          this.experiences = this.experiences.filter(exp => exp.id !== parseInt(id));
        },
          (error: HttpErrorResponse) => {
            new Alerts('error').showError();
          }
        );

      }
    })
  }


}
