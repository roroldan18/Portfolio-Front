import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEducation } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url:string = 'http://localhost:5001/education';

  constructor(
    private http: HttpClient
  ) { }

  getEducations(): Observable<IEducation[]> {
    return this.http.get<IEducation[]>(this.url);
  }
}
