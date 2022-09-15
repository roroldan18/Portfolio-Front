export class ProfileDto{
 bannerImage: string;
 profileImage: string;
 name:string;
 lastName:string;
 title:string;
 province:string; 
 country:string;
 telephone:string;
 email:string;
 aboutMe: string;
 logo:string;
 idUser: number;


  constructor(
    bannerImage: string, 
    profileImage: string, 
    name: string, 
    lastName: string, 
    title: string, 
    province: string, 
    country: string, 
    telephone: string, 
    email: string, 
    aboutMe: string, 
    logo: string, 
    idUser: number
) {
    this.bannerImage = bannerImage
    this.profileImage = profileImage
    this.name = name
    this.lastName = lastName
    this.title = title
    this.province = province
    this.country = country
    this.telephone = telephone
    this.email = email
    this.aboutMe = aboutMe
    this.logo = logo
    this.idUser = idUser
  }


}