import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {
  private url = 'http://localhost:5001/skills';

  constructor(
    private http:HttpClient
  ) { }

  getSkills():Observable<ISkill[]>{
    return this.http.get<ISkill[]>(this.url);
  }
  
}
