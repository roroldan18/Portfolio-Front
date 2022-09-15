import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEducation } from 'src/interfaces/interfaces';
import { IUser } from '../../interfaces/interfaces';
import { EducationDto } from '../../model/education-dto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url:string = 'http://localhost:8080/education';
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

  postEducation(education: EducationDto){
    this.http.post<EducationDto>(`${this.url}/`, education, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Education: ${education.careerTitle} Added`,
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

  putEducation(education: EducationDto, id:number){
    this.http.put<EducationDto>(`${this.url}/${id}`, education, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Edited!',
        `Education: ${education.careerTitle} Edited`,
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
  
  deleteEducation(id:number){
    this.http.delete<IEducation>(`${this.url}/${id}`).subscribe( (response) => {
      Swal.fire(
        'Deleted!',
        `Education Deleted`,
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
