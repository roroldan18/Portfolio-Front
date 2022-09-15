import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from 'src/model/login-user';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})  
export class LoginComponent implements OnInit {
  loginUser: LoginUser;
  isLogged:boolean = false;
  roles:string[] = [];

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router
  ) {
      this.loginService.loggedIn.subscribe(res => this.isLogged = res);
   }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(event:Event){
    event.preventDefault();

    if(this.loginForm.valid){
      this.loginUser = new LoginUser(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value);
      this.loginService.login(this.loginUser).subscribe(data => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.loginService.loggedIn.next(true);
      }, err => {
        Swal.fire(
          'Error on login!',
          'Some value is wrong',
          'error'
        )
        this.loginService.loggedIn.next(false);
      })


      this.router.navigateByUrl("/inicio");

    } else{
      this.loginService.loggedIn.next(false);
    }
  }

}
