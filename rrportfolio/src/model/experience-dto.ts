export class ExperienceDto {
  company: string;
  title:string;
  description: string;
  timeWork: string;
  startDate: Date;
  endDate: Date|null;
  logo: string;
  isActual: boolean;
  idUser: number;


  constructor(company:string, title:string, description:string, timeWork:string, startDate:Date, endDate:Date|null=null, logo:string, isActual:boolean, idUser:number){
    this.company = company;
    this.description = description;
    this.title = title;
    this.timeWork = timeWork;
    this.startDate = startDate;
    this.endDate = endDate;
    this.logo = logo;
    this.isActual = isActual;
    this.idUser = idUser;
  }  

}
