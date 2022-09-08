import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IExperience } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})


export class ExperiencesInfoService {
  private url = 'http://localhost:5001/experience';
  
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
    return this.http.get<IExperience[]>(this.url);
  }

  postExperience(experience: IExperience){
    this.http.post<IExperience>(`${this.url}`, experience, this.httpOptions).subscribe();
  }

  putExperience(experience: IExperience){
    this.http.put<IExperience>(`${this.url}/${experience.id}`, experience, this.httpOptions).subscribe()
  }
  deleteExperience(id:string){
    this.http.delete<IExperience>(`${this.url}/${id}`).subscribe()
  }



}
