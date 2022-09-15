export class EducationDto{
  careerTitle:string;
  educationalEstablishment:string;
  image?:string;
  startDate:Date;
  endDate:Date;
  isActual:boolean;
  idUser:number;


  constructor(
    careerTitle: string, 
    educationalEstablishment: string, 
    startDate: Date, 
    endDate: Date, 
    isActual: boolean, 
    idUser: number,
    image?: string,  
) {
    this.careerTitle = careerTitle
    this.educationalEstablishment = educationalEstablishment
    this.image = image
    this.startDate = startDate
    this.endDate = endDate
    this.isActual = isActual
    this.idUser = idUser
  }

}