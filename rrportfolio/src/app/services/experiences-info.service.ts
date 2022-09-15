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

  postExperience(experience: ExperienceDto){
    this.http.post<ExperienceDto>(`${this.url}/`, experience, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Experience: ${experience.title} in ${experience.company} Added`,
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

  putExperience(experience: ExperienceDto, id:number){
    this.http.put<ExperienceDto>(`${this.url}/${id}`, experience, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Edited!',
        `Experience: ${experience.title} in ${experience.company} Edited`,
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
  deleteExperience(id:number){
    this.http.delete<ExperienceDto>(`${this.url}/${id}`).subscribe( (response) => {
      Swal.fire(
        'Deleted!',
        `Experience Deleted`,
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



}
