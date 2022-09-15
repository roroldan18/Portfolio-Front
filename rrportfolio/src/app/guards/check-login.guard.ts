import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private tokenService: TokenService){
  }

  canActivate(): boolean {
    const token = this.tokenService.getToken();
    if(token != null){
      return false;
    } else {
      return true;
    }
  }
  
}
