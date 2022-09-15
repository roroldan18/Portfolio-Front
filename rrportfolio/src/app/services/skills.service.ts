import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from 'src/interfaces/interfaces';
import { SkillDto } from '../../model/skill-dto';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private url = 'http://localhost:8080/skill';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http:HttpClient
  ) { }

  getSkills():Observable<ISkill[]>{
    return this.http.get<ISkill[]>(this.url+"/");
  }

  getSkillsByUser(idUser: number): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.url+`/user/${idUser}`);
  }

  postSkill(skill: SkillDto){
    this.http.post<SkillDto>(`${this.url}/`, skill, this.httpOptions).subscribe();
  }

  putSkill(skill: SkillDto, id:number){
    this.http.put<SkillDto>(`${this.url}/${id}`, skill, this.httpOptions).subscribe()
  }
  deleteSkill(id:number){
    this.http.delete<SkillDto>(`${this.url}/${id}`).subscribe()
  }
  
}
