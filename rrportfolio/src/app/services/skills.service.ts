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

  postSkill(skill: SkillDto){
    console.log(skill)
    this.http.post<SkillDto>(`${this.url}/`, skill, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Skill: ${skill.name} - added`,
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
    );
  }

  putSkill(skill: SkillDto, id:number){
    return this.http.put<any>(`${this.url}/${id}`, skill, this.httpOptions).subscribe( (response) => {
      Swal.fire({
        icon: 'success',
        title: `Skill ${skill.name} - Edited`,
        showConfirmButton: false,
        timer: 1500
      })
  },
  (error: HttpErrorResponse) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops, something went wrong.',
      showConfirmButton: false,
      timer: 1500
    })
  })
  }

  deleteSkill(id:number){
    this.http.delete<SkillDto>(`${this.url}/${id}`).subscribe( (response) => {
      Swal.fire(
        'Deleted!',
        'Skill deleted',
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
    )
  }
  
}
