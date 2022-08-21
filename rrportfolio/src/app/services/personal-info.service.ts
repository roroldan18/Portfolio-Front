import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPersonalInfo } from 'src/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private url = 'http://localhost:5001/profile';

  constructor(
    private http: HttpClient,
  ) { }

  getPersonalInfo(): Observable<IPersonalInfo[]> {
    return this.http.get<IPersonalInfo[]>(this.url);
  }
}
