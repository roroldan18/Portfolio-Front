import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IPortfolio } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-single-portfolio',
  templateUrl: './single-portfolio.component.html',
  styleUrls: ['./single-portfolio.component.css']
})
export class SinglePortfolioComponent implements OnInit {
  @Input() portfolio: IPortfolio;
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

}
