export class PortfolioDto{
  name:string;
  description:string;
  image:string;
  url:string;
  startDate:Date;
  endDate:Date;
  idUser:number;


  constructor(
    name: string, 
    description: string, 
    image: string, 
    url: string, 
    startDate: Date, 
    endDate: Date, 
    idUser: number
) {
    this.name = name
    this.description = description
    this.image = image
    this.url = url
    this.startDate = startDate
    this.endDate = endDate
    this.idUser = idUser
  }

}