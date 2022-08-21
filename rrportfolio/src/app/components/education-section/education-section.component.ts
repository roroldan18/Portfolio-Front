import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { IEducation } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent implements OnInit {
  education:IEducation[] = [];

  constructor(
    private educationService:EducationService
  ) { }

  ngOnInit(): void {
    this.educationService.getEducations().subscribe(education => {
      this.education = education;
    })
  }

  clickAdd(){
    console.log('ADD EDUCATION');
  }

  clickEdit(id:string){
    console.log('Edit id: ' + id);
  }

  clickDelete(id:string){
    console.log('Delete id: ' + id);
  }

}
