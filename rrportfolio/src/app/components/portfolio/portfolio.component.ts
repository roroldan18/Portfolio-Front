import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { IPortfolio } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
import { unObjectPort } from '../../helpers/unObject';
import { LoginService } from '../../services/login.service';
import { UserService } from 'src/app/services/user.service';
import { PortfolioDto } from '../../../model/portfolio-dto';
import { Alerts } from '../../../model/Alerts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio:IPortfolio[] = [];
  showAdd:boolean = false;
  loggedIn:boolean = false;
  private idUser: number;
  private username: string|null;

  constructor(
    private portfolioService: PortfolioService,
    private userService: UserService,
    private loginService: LoginService,
  ) { 
    this.loginService.loggedIn.subscribe(res => this.loggedIn = res);
    if(this.loggedIn){
      this.username = window.sessionStorage.getItem('AuthUsername');
      this.userService.getUserByUsername(this.username as string).subscribe(res => this.idUser = res.id);
    }
  }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe( portfolio => {
      this.portfolio = portfolio.sort((a: IPortfolio, b: IPortfolio) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
    })
  }

  onShowAdd(){
    this.showAdd = !this.showAdd;
  }

  addPortfolio(port:IPortfolio){
    const portToPost = new PortfolioDto(port.name, port.description, port.image, port.url, port.startDate, port.endDate,this.idUser);
    this.portfolioService.postPortfolio(portToPost).subscribe( (response) => {
      new Alerts('success', 'Added!', `Portfolio: ${port.name} added`).showSuccess();
      this.onShowAdd();
      this.portfolio.push({...port, id: response.id});
    },
      (error: HttpErrorResponse) => {
        new Alerts('error').showError();
      }
    );

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
        this.portfolioService.deletePortfolio(parseInt(id)).subscribe( (response) => {
          new Alerts('success', 'Deleted!', `Portfolio deleted`).showSuccess();
          this.portfolio = this.portfolio.filter(port => port.id !== parseInt(id));
        },
          (error: HttpErrorResponse) => {
            new Alerts('error').showError();
          }
        );


      }
    })
  }

  editPortfolio(port: IPortfolio){
    const portToPut = new PortfolioDto(port.name, port.description, port.image, port.url, port.startDate, port.endDate,this.idUser);
    this.portfolioService.putPortfolio(portToPut, port.id).subscribe( (response) => {
      new Alerts('success', 'Edited!', `Portfolio: ${port.name} edited`).showSuccess();
      this.portfolio = unObjectPort(this.portfolio, port);
    },
      (error: HttpErrorResponse) => {
        new Alerts('error').showError();
      }
    )


  }

}
