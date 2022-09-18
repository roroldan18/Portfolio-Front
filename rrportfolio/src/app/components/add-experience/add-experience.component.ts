import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperiencesInfoService } from 'src/app/services/experiences-info.service';
import { IExperience } from 'src/interfaces/interfaces';
import { Alerts } from '../../../model/Alerts';

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
        company: ['', [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        logo: ['', [Validators.required]],
        timeWork: ['', [Validators.required]], //Validar de acuerdo al tipo
        startDate: ['', [Validators.required]], //Tipo fecha
        endDate: [null, [Validators.required]],//Tipo fecha / OPCIONAL Pero obligatorio si no se tilda actual
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
        endDate: [this.experience?.endDate, [Validators.required]],
        isActual: [this.experience?.isActual, [Validators.required]],
      })
    }
    this.onChangeCurrent();
  }

  onCreateNewExperience(event:Event) {
    event.preventDefault();
    if(this.formAddExperience.valid){
      this.addExp.emit(this.formAddExperience.value);
    } else {
      new Alerts("error").showErrorMissing();
    }
  }

  onEditSingleExp(event:Event) {
    event.preventDefault();
    if(this.formAddExperience.valid){
      this.edExp.emit(this.formAddExperience.value);
    } else{
      new Alerts("error").showErrorMissing();
    }
  }

  onChangeCurrent(){
    if(this.formAddExperience.get('isActual')?.value){
      this.formAddExperience.get('endDate')?.setValue(null);
      this.formAddExperience.get('endDate')?.clearValidators();
      this.formAddExperience.get('endDate')?.updateValueAndValidity();
    } else {
      this.formAddExperience.controls['endDate'].setValidators([Validators.required])
      this.formAddExperience.get('endDate')?.updateValueAndValidity();
    }
  }


}
