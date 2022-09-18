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
  private url = 'https://bknd-portfolio.herokuapp.com/profile';
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

  postPersonalInfo(personalInfo: ProfileDto):Observable<any> {
    return this.http.post<ProfileDto>(this.url+"/", personalInfo, this.httpOptions);
  }

  putPersonalInfo(personalInfo: ProfileDto, id:number):Observable<any> {
    return this.http.put<ProfileDto>(`${this.url}/${id}`, personalInfo, this.httpOptions);
  }
  deletePersonalInfo(id: number):Observable<any> {
    return this.http.delete<IPersonalInfo>(`${this.url}/${id}`);
  }
}
