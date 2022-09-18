import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPortfolio } from 'src/interfaces/interfaces';
import { PortfolioDto } from '../../model/portfolio-dto';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private url = 'https://bknd-portfolio.herokuapp.com/portfolio';
  
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

  postPortfolio(port: PortfolioDto):Observable<any> {
    return this.http.post<PortfolioDto>(this.url+"/", port, this.httpOptions);
  }

  putPortfolio(port: PortfolioDto, id:number):Observable<any> {
    return this.http.put<PortfolioDto>(`${this.url}/${id}`, port, this.httpOptions);
  }
  
  deletePortfolio(id: number):Observable<any> {
    return this.http.delete<IPortfolio>(`${this.url}/${id}`);
  }
}
