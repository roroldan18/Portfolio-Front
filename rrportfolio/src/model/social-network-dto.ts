export class SocialNetworkDto {
  url: string;
  icon: string;
  name: string;
  downloadable: boolean;
  idUser: number;

  constructor(url:string, icon: string, name:string, downloadable: boolean, idUser:number){
    this.url = url;
    this.icon = icon;
    this.name = name;
    this.downloadable = downloadable;
    this.idUser = idUser;
  }
}