import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEducation } from '../../../interfaces/interfaces';
import { Alerts } from '../../../model/Alerts';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {
  @Input() education?:IEducation = {} as IEducation;
  formAddEducation: FormGroup;
  @Input() addMode: boolean = false;
  @Output() addEduc = new EventEmitter<IEducation>();
  @Output() edEduc = new EventEmitter<IEducation>();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    if(this.addMode){
      this.formAddEducation = this.formBuilder.group({
        careerTitle: ['', [Validators.required]],
        educationalEstablishment: ['', [Validators.required]],
        image: [''],
        startDate: ['', [Validators.required]], 
        endDate: [null, [Validators.required]], 
        isActual: [false, [Validators.required]],
      })
    } else {
      this.formAddEducation = this.formBuilder.group({
        id: [this.education?.id, [Validators.required]],
        careerTitle: [this.education?.careerTitle, [Validators.required]],
        educationalEstablishment: [this.education?.educationalEstablishment, [Validators.required]],
        image: [this.education?.image],
        startDate: [this.education?.startDate, [Validators.required]], 
        endDate: [this.education?.endDate, [Validators.required]], 
        isActual: [this.education?.isActual, [Validators.required]],
      })
    }
    this.onChangeCurrent();
  }

  onCreateNewEducation(event: Event){
    event.preventDefault();
    if(this.formAddEducation.valid){
      this.addEduc.emit(this.formAddEducation.value)
    } else {
      new Alerts('error').showErrorMissing();
    }
  }

  onEditEducation(event: Event){
    event.preventDefault();
    if(this.formAddEducation.valid){
      this.edEduc.emit(this.formAddEducation.value);
    } else {
      new Alerts('error').showErrorMissing();
    }
  }

  onChangeCurrent(){
    if(this.formAddEducation.get('isActual')?.value){
      this.formAddEducation.get('endDate')?.setValue(null);
      this.formAddEducation.get('endDate')?.clearValidators();
      this.formAddEducation.get('endDate')?.updateValueAndValidity();
    } else {
      this.formAddEducation.controls['endDate'].setValidators([Validators.required]);
      this.formAddEducation.get('endDate')?.updateValueAndValidity();
      
    }
  }

}
