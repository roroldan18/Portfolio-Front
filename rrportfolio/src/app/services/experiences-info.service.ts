import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExperience } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesInfoService {
  private url = 'http://localhost:5001/experience';

  constructor(
    private http:HttpClient
  ) { }

  getExperiences(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.url);
  }
}
