import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { IPortfolio } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
import { unObjectPort } from '../../helpers/unObject';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';
import { UserService } from 'src/app/services/user.service';
import { PortfolioDto } from '../../../model/portfolio-dto';

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
      this.portfolio = portfolio;
    })
  }

  onShowAdd(){
    this.showAdd = !this.showAdd;
  }

  addPortfolio(port:IPortfolio){
    const portToPost = new PortfolioDto(port.name, port.description, port.image, port.url, port.startDate, port.endDate,this.idUser);
    this.portfolioService.postPortfolio(portToPost);
    Swal.fire({
      icon: 'success',
      title: 'Portfolio Saved',
      showConfirmButton: false,
      timer: 1500
    })
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
        this.portfolioService.deletePortfolio(parseInt(id));
        this.portfolio = this.portfolio.filter(port => port.id !== parseInt(id));
      }
    })
  }

  editPortfolio(port: IPortfolio){
    const portToPut = new PortfolioDto(port.name, port.description, port.image, port.url, port.startDate, port.endDate,this.idUser);
    this.portfolioService.putPortfolio(portToPut, port.id);
    Swal.fire({
      icon: 'success',
      title: 'Portfolio Edited',
      showConfirmButton: false,
      timer: 1500
    })
    this.portfolio = unObjectPort(this.portfolio, port);
  }

}
