import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://bknd-portfolio.herokuapp.com/users';

  constructor(
    private http:HttpClient
  ) { }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(this.url+`/username/${username}`);
  }
}
