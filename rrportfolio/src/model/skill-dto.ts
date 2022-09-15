export class SkillDto{
  name:string;
  icon:string;
  abilityPercentage:number;
  idUser:number;


  constructor(
    name: string, 
    icon: string, 
    abilityPercentage: number, 
    idUser: number
) {
    this.name = name
    this.icon = icon
    this.abilityPercentage = abilityPercentage
    this.idUser = idUser
  }

}