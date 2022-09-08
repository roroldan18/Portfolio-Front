import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { IPortfolio } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
import { unObjectPort } from '../../helpers/unObject';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio:IPortfolio[] = [];
  showAdd:boolean = false;

  constructor(
    private portfolioService: PortfolioService
  ) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe( portfolio => {
      this.portfolio = portfolio;
    })
  }

  onShowAdd(){
    this.showAdd = !this.showAdd;
  }

  addPortfolio(port:IPortfolio){
    console.log('PARENT ADD')
    this.portfolioService.postPortfolio(port);
    this.onShowAdd();
    this.portfolio.unshift(port);
  }

  deletePortfolio(id: string){
    Swal.fire({
      title: 'Seguro que deseas eliminar el portafolio?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El portafolio fue eliminado.',
          'success'
        )
        this.portfolioService.deletePortfolio(id);
        this.portfolio = this.portfolio.filter(port => port.id !== id);
      }
    })
  }

  editPortfolio(port: IPortfolio){
    this.portfolioService.putPortfolio(port);
    this.portfolio = unObjectPort(this.portfolio, port);
  }

}
