import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createID } from 'src/app/helpers/createID';
import Swal from 'sweetalert2';
import { IEducation } from '../../../interfaces/interfaces';

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
        id: [createID(), [Validators.required]],
        careerTitle: ['', [Validators.required]],
        educationalEstablishment: ['', [Validators.required]],
        image: [''],
        startDate: ['', [Validators.required]], 
        endDate: ['', [Validators.required]], 
        isActual: [false, [Validators.required]],
      })
    } else {
      this.formAddEducation = this.formBuilder.group({
        id: [this.education?.id],
        careerTitle: [this.education?.careerTitle],
        educationalEstablishment: [this.education?.educationalEstablishment],
        image: [this.education?.image],
        startDate: [this.education?.startDate], 
        endDate: [this.education?.endDate], 
        isActual: [this.education?.isActual],
      })
    }
  }

  onCreateNewEducation(event: Event){
    event.preventDefault();
    if(this.formAddEducation.valid){
      this.addEduc.emit(this.formAddEducation.value)
    } else {
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
  }

  onEditEducation(event: Event){
    event.preventDefault();
    if(this.formAddEducation.valid){
      this.edEduc.emit(this.formAddEducation.value);
    } else {
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
  }

  onChangeCurrent(){
    if(this.formAddEducation.get('isActual')?.value){
      this.formAddEducation.get('end_date')?.clearValidators();
      this.formAddEducation.get('end_date')?.updateValueAndValidity();
    } else {
      this.formAddEducation.controls['end_date'].setValidators([Validators.required]);
      this.formAddEducation.get('end_date')?.updateValueAndValidity();
      
    }
  }

}
