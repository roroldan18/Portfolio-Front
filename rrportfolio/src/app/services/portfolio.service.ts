import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPortfolio } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private url = 'http://localhost:5001/portfolio';

  constructor(
    private http: HttpClient
  ) { }

  getPortfolio():Observable<IPortfolio[]> {
    return this.http.get<IPortfolio[]>(this.url);
  }
}
