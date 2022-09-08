import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {  unObjectExp } from 'src/app/helpers/unObject';
import { ExperiencesInfoService } from 'src/app/services/experiences-info.service';
import { IExperience } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {
  addExperience: boolean = false;
  experiences: IExperience[] = [];
  
  constructor(
    private experienceService: ExperiencesInfoService,
  ) {
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
    this.experienceService.putExperience(experience);
    this.experiences = unObjectExp(this.experiences, experience);
  }

  onAddExperienceButton() {
    this.addExperience = !this.addExperience;
  }

  onAddExperience(experience: IExperience){
    this.experienceService.postExperience(experience);
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
        this.experienceService.deleteExperience(id);
        this.experiences = this.experiences.filter(exp => exp.id !== id);
      }
    })
  }


}
