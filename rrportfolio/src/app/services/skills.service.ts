import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private url = 'http://localhost:5001/skills';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http:HttpClient
  ) { }

  getSkills():Observable<ISkill[]>{
    return this.http.get<ISkill[]>(this.url);
  }

  postSkill(skill: ISkill){
    this.http.post<ISkill>(`${this.url}`, skill, this.httpOptions).subscribe();
  }

  putSkill(skill: ISkill){
    this.http.put<ISkill>(`${this.url}/${skill.id}`, skill, this.httpOptions).subscribe()
  }
  deleteSkill(id:string){
    this.http.delete<ISkill>(`${this.url}/${id}`).subscribe()
  }
  
}
