import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';
import { SocialNetworkDto } from 'src/model/social-network-dto';


@Injectable({
  providedIn: 'root'
})
export class IconService {
  private url = 'http://localhost:8080/socialnetwork';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
   }
  constructor(
    private http: HttpClient,
  ) { }

  getSocialNetwork(): Observable<ISocialNetworkIcon[]> {
    return this.http.get<ISocialNetworkIcon[]>(this.url+"/");
  }
  getSocialNetworkByUser(idUser: number): Observable<ISocialNetworkIcon[]> {
    return this.http.get<ISocialNetworkIcon[]>(this.url+`/user/${idUser}`);
  }

  postExperience(socNet: SocialNetworkDto){
    this.http.post<ISocialNetworkIcon>(`${this.url}/`, socNet, this.httpOptions).subscribe();
  }

  putExperience(socNet: SocialNetworkDto, id:number){
    this.http.put<SocialNetworkDto>(`${this.url}/${id}`, socNet, this.httpOptions).subscribe();
  }
  deleteExperience(id:string){
    this.http.delete<ISocialNetworkIcon>(`${this.url}/${id}`).subscribe();
  }



}
