import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonalInfo } from 'src/interfaces/interfaces';
import { ProfileDto } from 'src/model/profile-dto';

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
    this.http.post<ProfileDto>(this.url+"/", personalInfo, this.httpOptions).subscribe();
  }

  putPersonalInfo(personalInfo: ProfileDto, id:number) {
    this.http.put<ProfileDto>(`${this.url}/${id}`, personalInfo, this.httpOptions).subscribe();
  }
  deletePersonalInfo(id: number) {
    this.http.delete<IPersonalInfo>(`${this.url}/${id}`).subscribe();
  }
}
