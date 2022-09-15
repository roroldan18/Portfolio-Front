import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonalInfo } from 'src/interfaces/interfaces';
import { ProfileDto } from 'src/model/profile-dto';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private url = 'http://localhost:8080/profile';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http: HttpClient,
  ) { }

  getPersonalInfo(): Observable<IPersonalInfo[]> {
    return this.http.get<IPersonalInfo[]>(this.url+"/");
  }
  
  getPersonalInfoByIdUser(idUser: number): Observable<IPersonalInfo[]> {
    return this.http.get<IPersonalInfo[]>(this.url+`/user/${idUser}`);
  }

  postPersonalInfo(personalInfo: ProfileDto) {
    this.http.post<ProfileDto>(this.url+"/", personalInfo, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Personal Info - added`,
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
    );;
  }

  putPersonalInfo(personalInfo: ProfileDto, id:number) {
    this.http.put<ProfileDto>(`${this.url}/${id}`, personalInfo, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Edited!',
        `Personal Info edited`,
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
    );;
  }
  deletePersonalInfo(id: number) {
    this.http.delete<IPersonalInfo>(`${this.url}/${id}`).subscribe( (response) => {
      Swal.fire(
        'Deleted!',
        `Personal Info Deleted`,
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
