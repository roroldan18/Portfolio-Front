import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPortfolio } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
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
    this.http.post<PortfolioDto>(this.url+"/", port, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Portfolio: ${port.name} - added`,
        'success'
      )    
    },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );;
  }

  putPortfolio(port: PortfolioDto, id:number) {
    this.http.put<PortfolioDto>(`${this.url}/${id}`, port, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Edited!',
        `Portfolio: ${port.name} - edited`,
        'success'
      )    
    },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );;
  }
  
  deletePortfolio(id: number) {
    this.http.delete<IPortfolio>(`${this.url}/${id}`).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Skill deleted`,
        'success'
      )    
    },
      (error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );;
  }
}
