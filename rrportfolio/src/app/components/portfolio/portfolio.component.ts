import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { IPortfolio } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio:IPortfolio[] = [];

  constructor(
    private service: PortfolioService
  ) { }

  ngOnInit(): void {
    this.service.getPortfolio().subscribe( portfolio => {
      this.portfolio = portfolio;
    })
  }

}
