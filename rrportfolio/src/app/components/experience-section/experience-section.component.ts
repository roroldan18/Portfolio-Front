import { Component, OnInit } from '@angular/core';
import { ExperiencesInfoService } from 'src/app/services/experiences-info.service';
import { IExperience } from 'src/interfaces/interfaces';
import { calculateTimimg } from 'src/utils/calculateTiming';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {
  experiences: IExperience[] = [];

  constructor(
    private experienceService: ExperiencesInfoService
  ) { }

  ngOnInit(): void {
    this.experienceService.getExperiences().subscribe((experiences:IExperience[]) => {
      this.experiences = experiences;
    })
  }

  getTimeWorked(startDate:string, endDate?:string):string{
    const [yearS, monthS, dayS] = startDate.split('-');
    const [yearE, monthE, dayE] = endDate ? endDate.split('-') : new Date().toISOString().split('-');

    const start:any = new Date(parseInt(yearS), parseInt(monthS), parseInt(dayS));  
    const end:any = new Date(parseInt(yearE), parseInt(monthE), parseInt(dayE));
    
    
    const diffTime:number = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    const { years, months} = calculateTimimg(diffDays);

    if(years == 0 && months == 0){
      return `${diffDays} días`;
    }else if(years == 0){
      return `${months} meses`;
    } else if (months == 0){
      return `${years} años`;
    } else {
      return `${years} años y ${months} meses`;
    }
  }
}
