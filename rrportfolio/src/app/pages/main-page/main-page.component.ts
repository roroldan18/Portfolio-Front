import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  isLogged:boolean = false;

  constructor(
    private loginService: LoginService
  ) { 
    this.loginService.loggedIn.subscribe(res => this.isLogged = res);
  }

  ngOnInit(): void {
  }

}
