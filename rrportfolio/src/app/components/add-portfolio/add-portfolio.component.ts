import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { IPortfolio } from '../../../interfaces/interfaces';
import { createID } from 'src/app/helpers/createID';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css']
})
export class AddPortfolioComponent implements OnInit {
  @Input() port?:IPortfolio = {} as IPortfolio;
  @Input() addMode:boolean = false;
  @Output() edPort = new EventEmitter<IPortfolio>();
  @Output() addPort = new EventEmitter<IPortfolio>();

  portfolios: IPortfolio[] = [];
  formAddPortfolio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private porfolioService: PortfolioService,
  ) { }

  ngOnInit(): void {
    this.porfolioService.getPortfolio().subscribe(port => {
      this.portfolios = port;
    })

    if(this.addMode){
      this.formAddPortfolio = this.formBuilder.group({
        id: [createID(), [Validators.required]],
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        image: ['', [Validators.required]],
        url: ['', [Validators.required]],
        idUser: ['1', [Validators.required]],
        startDate:['', [Validators.required]],
        endDate:['', [Validators.required]],
      })
    } else {
      this.formAddPortfolio = this.formBuilder.group({
        id: [this.port?.id, [Validators.required]],
        name: [this.port?.name, [Validators.required]],
        description: [this.port?.description, [Validators.required]],
        image: [this.port?.image, [Validators.required]],
        url: [this.port?.url, [Validators.required]],
        idUser: ['1', [Validators.required]],
        startDate:[this.port?.startDate, [Validators.required]],
        endDate:[this.port?.endDate, [Validators.required]],
      })
    }
  }

  onAddPort(event:Event){
    event.preventDefault();
    if(this.formAddPortfolio.valid){
      this.addPort.emit(this.formAddPortfolio.value)
    } else {
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
    
  }

  onEditPort(event:Event){
    event.preventDefault();
    if(this.formAddPortfolio.valid){
      this.edPort.emit(this.formAddPortfolio.value);
    } else {
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }

  }

}
