import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ExperienceDto } from 'src/model/experience-dto';
import { IExperience } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class ExperiencesInfoService {
  private url = 'http://localhost:8080/experience';
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }


  constructor(
    private http:HttpClient
  ) {
   }

  getExperiences(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.url+"/");
  }

  getExperienceByUser(idUser: number): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.url+`/user/${idUser}`);
  }

  postExperience(experience: ExperienceDto):Observable<any>{
    return this.http.post<Observable<ExperienceDto>>(`${this.url}/`, experience, this.httpOptions);
  }

  putExperience(experience: ExperienceDto, id:number):Observable<any>{
    return this.http.put<Observable<ExperienceDto>>(`${this.url}/${id}`, experience, this.httpOptions);
  }

  deleteExperience(id:number):Observable<any>{
    return this.http.delete<Observable<ExperienceDto> >(`${this.url}/${id}`);
  }



}
