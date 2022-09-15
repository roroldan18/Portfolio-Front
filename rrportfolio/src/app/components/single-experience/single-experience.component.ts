import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IExperience } from 'src/interfaces/interfaces';
import {  getTimeWorkedHelper } from 'src/app/helpers/getTimeWorkedHelper';
import { formatDate } from 'src/app/helpers/formatDate';

@Component({
  selector: 'app-single-experience',
  templateUrl: './single-experience.component.html',
  styleUrls: ['./single-experience.component.css']
})
export class SingleExperienceComponent implements OnInit {
  @Input() experience:IExperience = {} as IExperience;
  @Input() isLoggedIn:boolean;
  @Output() onEdit = new EventEmitter<IExperience>();
  @Output() onDel = new EventEmitter<string>();
  editable:boolean=false;


  constructor() { }

  ngOnInit(): void {
  }

  getDate(date:Date|undefined|null):string{
    if(date===undefined || date === null){
      return 'Actualidad';
    } else {
      const dt = new Date(date)
      return  formatDate(dt);
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

  getTimeWorked(startDate:Date, endDate?:Date):string{
    return getTimeWorkedHelper(startDate,endDate);
  } 


}
