import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IconService {
  private url = 'http://localhost:5001/social_network';

  constructor(
    private http: HttpClient,
  ) { }

  getIcons(): Observable<ISocialNetworkIcon[]> {
    return this.http.get<ISocialNetworkIcon[]>(this.url);
  }

}
