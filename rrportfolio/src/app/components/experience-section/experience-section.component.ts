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
      this.experiences = experiences;
    })
  }

  onEditExperience(experience:IExperience){
    const expDto:ExperienceDto = new ExperienceDto(experience.company, experience.title, experience.description,experience.timeWork, experience.startDate, experience.endDate, experience.logo, experience.isActual, this.idUser);
    this.experienceService.putExperience(expDto, experience.id);
    Swal.fire({
      icon: 'success',
      title: 'Experience Edited',
      showConfirmButton: false,
      timer: 1500
    })
    this.experiences = unObjectExp(this.experiences, experience);
  }

  onAddExperienceButton() {
    this.addExperience = !this.addExperience;
  }

  onAddExperience(experience: IExperience){
    const expDto:ExperienceDto = new ExperienceDto(experience.company, experience.title, experience.description,experience.timeWork, experience.startDate, experience.endDate, experience.logo, experience.isActual, this.idUser);
    this.experienceService.postExperience(expDto);
    Swal.fire({
      icon: 'success',
      title: 'Experience Added',
      showConfirmButton: false,
      timer: 1500
    })
    this.onAddExperienceButton();
    this.experiences.unshift(experience);
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
        Swal.fire(
          'Borrado!',
          'La experiencia fue eliminada.',
          'success'
        )
        this.experienceService.deleteExperience(parseInt(id));
        this.experiences = this.experiences.filter(exp => exp.id !== parseInt(id));
      }
    })
  }


}
