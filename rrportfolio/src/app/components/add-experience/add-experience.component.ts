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
  currentWork: boolean = false;
  
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
        logo: [''], //OPCIONAL
        time_work: ['', [Validators.required]], //Validar de acuerdo al tipo
        start_date: ['', [Validators.required]], //Tipo fecha
        end_date: [''],//Tipo fecha / OPCIONAL Pero obligatorio si no se tilda actual
        isCurrent: ['', [Validators.required]],
      })
    }  else {
      this.formAddExperience = this.formBuilder.group({
        id: [this.experience?.id],
        company: [''],
        title: [''],
        description: [''],
        logo: [''], 
        time_work: [''], 
        start_date: [''],
        end_date: [],
        isCurrent: [''],
      })
    }
  }

  onCreateNewExperience(event:Event) {
    event.preventDefault();
    if(this.formAddExperience.valid){
      console.log('VALID')
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
    let experienceEdited = Object.values(this.experiences).find(exp => exp.id === this.formAddExperience.value.id);
    const formEd = objFormNotEmpty(this.formAddExperience.value);
    if(experienceEdited){
      experienceEdited = {
        ...experienceEdited,
        ...formEd
      };
      this.edExp.emit(experienceEdited);
    }
  }

  onChangeCurrent(){
    this.currentWork = !this.currentWork;
    if(!this.currentWork){
      this.formAddExperience.controls['end_date'].setValidators([Validators.required])
    } else {
      this.formAddExperience.controls['end_date'].removeValidators([Validators.required])
    }
  }


}
