import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IExperience } from 'src/interfaces/interfaces';
import { calculateTimimg } from 'src/utils/calculateTiming';

@Component({
  selector: 'app-single-experience',
  templateUrl: './single-experience.component.html',
  styleUrls: ['./single-experience.component.css']
})
export class SingleExperienceComponent implements OnInit {
  @Input() experience:IExperience = {} as IExperience;
  @Output() onEdit = new EventEmitter<IExperience>();
  @Output() onDel = new EventEmitter<string>();
  editable:boolean=false;


  constructor() { }

  ngOnInit(): void {
  }

  getDate(date:Date|string|undefined):string{
    //Modificar esta funcion con el backend. No debería tener valores String.
    if(date instanceof Date) {
      return date.getMonth()+'-'+date.getFullYear()
    }
    else {
      if(date==='' || date===undefined){
        return 'Actualidad'
      }
      return date;
    }
  }

  onEditEx(exp:IExperience){
    this.onEdit.emit(exp);
    this.onEditShow();
  }
  onEditShow(){
    this.editable = !this.editable;
  }

  onDelete(id:string){
    this.onDel.emit(id);
  }


  //Revisar metodo con BD
  getTimeWorked(startDate:string, endDate?:string):string{
    let end:any;
    let start:any;

    if(typeof(startDate) === 'string'){
      const [yearS, monthS, dayS] = startDate.split('-');
      start = new Date(parseInt(yearS), parseInt(monthS), parseInt(dayS));  
    }else{
      start = startDate;
    }


    if(endDate){

      if(typeof(startDate) === 'string'){
        const [yearE, monthE, dayE] = endDate ? endDate.split('-') : new Date().toISOString().split('-');
        end = new Date(parseInt(yearE), parseInt(monthE), parseInt(dayE));
      }else{
        end = endDate;
      }

    }else{
      end = Date.now();
    }
 
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
