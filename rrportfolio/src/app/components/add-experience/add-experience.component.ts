import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createID } from 'src/app/helpers/createID';
import { objFormNotEmpty } from 'src/app/helpers/objectForm';
import { ExperiencesInfoService } from 'src/app/services/experiences-info.service';
import { IExperience } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {
  @Input() experience?:IExperience = {} as IExperience;
  @Input() addMode:boolean = false;
  @Output() edExp = new EventEmitter<IExperience>();
  @Output() addExp = new EventEmitter<IExperience>();

  experiences: IExperience[] = [];
  formAddExperience: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private experienceService: ExperiencesInfoService,
    ) {}

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe((experiences:IExperience[]) => {
      this.experiences = experiences;
    })

    if(this.addMode){
      this.formAddExperience = this.formBuilder.group({
        id: [createID(), [Validators.required]],
        company: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        logo: ['', [Validators.required]],
        timeWork: ['', [Validators.required]], //Validar de acuerdo al tipo
        startDate: ['', [Validators.required]], //Tipo fecha
        endDate: ['', [Validators.required]],//Tipo fecha / OPCIONAL Pero obligatorio si no se tilda actual
        isActual: [false, [Validators.required]],
      })
    }  else {
      this.formAddExperience = this.formBuilder.group({
        id: [this.experience?.id, [Validators.required]],
        company: [this.experience?.company, [Validators.required]],
        title: [this.experience?.title, [Validators.required]],
        description: [this.experience?.description, [Validators.required]],
        logo: [this.experience?.logo, [Validators.required]], 
        timeWork: [this.experience?.timeWork, [Validators.required]], 
        startDate: [this.experience?.startDate, [Validators.required]],
        endDate: [this.experience?.endDate],
        isActual: [this.experience?.isActual, [Validators.required]],
      })
    }
  }

  onCreateNewExperience(event:Event) {
    event.preventDefault();
    if(this.formAddExperience.valid){
      this.addExp.emit(this.formAddExperience.value);
    } else {
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
  }

  onEditSingleExp(event:Event) {
    event.preventDefault();
    if(this.formAddExperience.valid){
      let experienceEdited = Object.values(this.experiences).find(exp => exp.id === this.formAddExperience.value.id);
      const formEd = objFormNotEmpty(this.formAddExperience.value);
      if(experienceEdited){
        experienceEdited = {
          ...experienceEdited,
          ...formEd
        };
        this.edExp.emit(experienceEdited);
      }
    } else{
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
  }

  onChangeCurrent(){
    if(!this.formAddExperience.get('isActual')?.value){
      this.formAddExperience.controls['endDate'].setValidators([Validators.required])
      this.formAddExperience.get('endDate')?.updateValueAndValidity();
    } else {
      this.formAddExperience.get('endDate')?.clearValidators();
      this.formAddExperience.get('endDate')?.updateValueAndValidity();
    }
  }


}
