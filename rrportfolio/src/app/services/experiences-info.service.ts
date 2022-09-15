import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ExperienceDto } from 'src/model/experience-dto';
import { IExperience } from '../../interfaces/interfaces';

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

  postExperience(experience: ExperienceDto){
    this.http.post<ExperienceDto>(`${this.url}/`, experience, this.httpOptions).subscribe();
  }

  putExperience(experience: ExperienceDto, id:number){
    this.http.put<ExperienceDto>(`${this.url}/${id}`, experience, this.httpOptions).subscribe()
  }
  deleteExperience(id:number){
    this.http.delete<ExperienceDto>(`${this.url}/${id}`).subscribe()
  }



}
