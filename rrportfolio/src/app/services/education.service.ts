import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEducation } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url:string = 'http://localhost:5001/education';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }

  constructor(
    private http: HttpClient
  ) { }

  getEducations(): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(this.url);
  }

  postEducation(education: IEducation){
    this.http.post<IEducation>(`${this.url}/`, education, this.httpOptions).subscribe();
  }

  putEducation(education: IEducation){
    this.http.put<IEducation>(`${this.url}/${education.id}`, education, this.httpOptions).subscribe()
  }
  
  deleteEducation(id:string){
    this.http.delete<IEducation>(`${this.url}/${id}`).subscribe()
  }



}
