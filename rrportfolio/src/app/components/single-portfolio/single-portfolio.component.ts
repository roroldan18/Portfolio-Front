import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { formatDate } from 'src/app/helpers/formatDate';
import { IPortfolio } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-single-portfolio',
  templateUrl: './single-portfolio.component.html',
  styleUrls: ['./single-portfolio.component.css']
})
export class SinglePortfolioComponent implements OnInit {
  @Input() portfolio: IPortfolio;
  @Input() isLoggedIn: boolean;
  @Output() onEdit = new EventEmitter<IPortfolio>();
  @Output() onDelete = new EventEmitter<string>();
  showEditPort:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onShowEdit(){
    this.showEditPort = !this.showEditPort;
  }

  onEditPort(port:IPortfolio){
    this.onEdit.emit(port);
  }
  onDeletePort(id: string){
    this.onDelete.emit(id);
  }
  
  getDate(date:Date|undefined|null):string{
    if(date===undefined || date === null){
      return 'Actualidad';
    } else {
      const dt = new Date(date)
      return  formatDate(dt);
    }
  }

}
