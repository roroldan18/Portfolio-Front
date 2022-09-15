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

  postSocNet(socNet: SocialNetworkDto){
    this.http.post<ISocialNetworkIcon>(`${this.url}/`, socNet, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Added!',
        `Social Network: ${socNet.name} Added`,
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

  putSocNet(socNet: SocialNetworkDto, id:number){
    this.http.put<SocialNetworkDto>(`${this.url}/${id}`, socNet, this.httpOptions).subscribe( (response) => {
      Swal.fire(
        'Edited!',
        `Social Network: ${socNet.name} Edited`,
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
  deleteSocNet(id:string){
    this.http.delete<ISocialNetworkIcon>(`${this.url}/${id}`).subscribe( (response) => {
      Swal.fire(
        'Deleted!',
        `Social Network Deleted`,
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
