import { IExperience } from '../../interfaces/interfaces';


export const unObject = (objExperiences:IExperience[], singExp:IExperience) =>{
    objExperiences.forEach((exp, index) => {
      if(exp.id === singExp.id){
        objExperiences[index] = singExp;
      }
    })

    return objExperiences;
}
