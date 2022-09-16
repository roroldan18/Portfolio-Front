import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from 'src/interfaces/interfaces';
import { SkillDto } from '../../model/skill-dto';
import Swal from 'sweetalert2';

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

  postSkill(skill: SkillDto):Observable<any>{
    return this.http.post<SkillDto>(`${this.url}/`, skill, this.httpOptions);
  }

  putSkill(skill: SkillDto, id:number):Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`, skill, this.httpOptions);
  }

  deleteSkill(id:number):Observable<any>{
    return this.http.delete<SkillDto>(`${this.url}/${id}`);
  }
  
}
