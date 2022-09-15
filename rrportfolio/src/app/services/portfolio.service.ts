import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPortfolio } from 'src/interfaces/interfaces';
import { PortfolioDto } from '../../model/portfolio-dto';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private url = 'http://localhost:8080/portfolio';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http: HttpClient
  ) { }

  getPortfolio():Observable<IPortfolio[]> {
    return this.http.get<IPortfolio[]>(this.url+"/");
  }

  getPorfolioByUser(idUser: number): Observable<IPortfolio[]> {
    return this.http.get<IPortfolio[]>(this.url+`/user/${idUser}`);
  }

  postPortfolio(port: PortfolioDto) {
    this.http.post<PortfolioDto>(this.url+"/", port, this.httpOptions).subscribe();
  }

  putPortfolio(port: PortfolioDto, id:number) {
    this.http.put<PortfolioDto>(`${this.url}/${id}`, port, this.httpOptions).subscribe();
  }
  deletePortfolio(id: number) {
    this.http.delete<IPortfolio>(`${this.url}/${id}`).subscribe();
  }
}
