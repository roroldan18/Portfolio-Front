import { IExperience, IEducation, ISkill, IPortfolio } from '../../interfaces/interfaces';


export const unObjectExp = (objExperiences:IExperience[], singExp:IExperience) =>{
    objExperiences.forEach((exp, index) => {
      if(exp.id === singExp.id){
        objExperiences[index] = singExp;
      }
    })

    return objExperiences;
}

export const unObjectEdu = (objEducation:IEducation[], singEdu:IEducation) =>{
    objEducation.forEach((exp, index) => {
      if(exp.id === singEdu.id){
        objEducation[index] = singEdu;
      }
    })

    return objEducation;
}
export const unObjectSkill = (objSkill:ISkill[], singskill:ISkill) =>{
  objSkill.forEach((exp, index) => {
      if(exp.id === singskill.id){
        objSkill[index] = singskill;
      }
    })

    return objSkill;
}
export const unObjectPort = (objPort:IPortfolio[], singPort:IPortfolio) =>{
  objPort.forEach((exp, index) => {
      if(exp.id === singPort.id){
        objPort[index] = singPort;
      }
    })

    return objPort;
}
