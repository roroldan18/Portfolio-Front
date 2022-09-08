import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPortfolio } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private url = 'http://localhost:5001/portfolio';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http: HttpClient
  ) { }

  getPortfolio():Observable<IPortfolio[]> {
    return this.http.get<IPortfolio[]>(this.url);
  }

  postPortfolio(port: IPortfolio) {
    this.http.post<IPortfolio>(this.url, port, this.httpOptions).subscribe();
  }

  putPortfolio(port: IPortfolio) {
    this.http.put<IPortfolio>(`${this.url}/${port.id}`, port, this.httpOptions).subscribe();
  }
  deletePortfolio(id: string) {
    this.http.delete<IPortfolio>(`${this.url}/${id}`).subscribe();
  }
}
