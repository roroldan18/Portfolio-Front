import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';
import { Observable } from 'rxjs';
import { SocialNetworkDto } from 'src/model/social-network-dto';
import Swal from 'sweetalert2';


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

  postSocNet(socNet: SocialNetworkDto):Observable<any>{
    return this.http.post<ISocialNetworkIcon>(`${this.url}/`, socNet, this.httpOptions);
  }

  putSocNet(socNet: SocialNetworkDto, id:number):Observable<any>{
    return this.http.put<SocialNetworkDto>(`${this.url}/${id}`, socNet, this.httpOptions);
  }
  deleteSocNet(id:string):Observable<any>{
    return this.http.delete<ISocialNetworkIcon>(`${this.url}/${id}`);
  }



}
