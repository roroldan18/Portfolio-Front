import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEducation } from 'src/interfaces/interfaces';
import { EducationDto } from '../../model/education-dto';


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url:string = 'https://bknd-portfolio.herokuapp.com/education';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http: HttpClient
  ) { }

  getEducations(): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(this.url+"/");
  }

  getEducationByUser(idUser: number): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(this.url+`/user/${idUser}`);
  }

  postEducation(education: EducationDto):Observable<any>{
    return this.http.post<Observable<any>>(`${this.url}/`, education, this.httpOptions);
  }

  putEducation(education: EducationDto, id:number):Observable<any>{
    return this.http.put<Observable<any>>(`${this.url}/${id}`, education, this.httpOptions);
  }
  
  deleteEducation(id:number):Observable<any>{
    return this.http.delete<Observable<any>>(`${this.url}/${id}`);
  }

}
