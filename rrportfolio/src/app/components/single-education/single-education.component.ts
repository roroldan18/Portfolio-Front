import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEducation } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-single-education',
  templateUrl: './single-education.component.html',
  styleUrls: ['./single-education.component.css']
})
export class SingleEducationComponent implements OnInit {
  @Input() singleEd:IEducation;
  openEdition:boolean = false;
  @Output() onEdit = new EventEmitter<IEducation>();
  @Output() onDel = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  clickEdit(id:string){
    this.openEdition = !this.openEdition
  }

  editEduc(education:IEducation){
    this.onEdit.emit(education);
    this.clickEdit;
  }


  clickDelete(id: string){
    this.onDel.emit(id);
  }

}
