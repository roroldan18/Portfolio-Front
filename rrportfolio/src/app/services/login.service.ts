import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginUser } from 'src/model/login-user';
import { JwtDto } from 'src/model/jwt-dto';
import { NewUser } from 'src/model/new-user';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private url = 'https://backend-portfolio-0evq.onrender.com/auth/';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.checkToken();
  }
  
  public login(loginUser: LoginUser):Observable<JwtDto>{   
    return this.http.post<JwtDto>(this.url+"login", loginUser);
  }

  public newUser(userNew: NewUser):Observable<any>{
    return this.http.post<any>(this.url+"new", userNew);
  }

  public checkToken(){
    const token = this.tokenService.getToken();
    if(token != null){
      const isExpired = helper.isTokenExpired(token);
      if(isExpired){
        alert('SESION EXPIRADA');
        this.logout();
        this.loggedIn.next(false);
        this.router.navigateByUrl("/login");
      }else {
        this.loggedIn.next(true)
      }
    } else {
      this.loggedIn.next(false)
    }
  }


  public logout():void{
    this.loggedIn.next(false);
    this.tokenService.logout();
  }

}
