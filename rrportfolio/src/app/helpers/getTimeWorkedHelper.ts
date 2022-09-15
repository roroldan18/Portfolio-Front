import { calculateTimimg } from "src/utils/calculateTiming";

export const getTimeWorkedHelper = (startDate:Date, endDate?:Date):string =>{
  let end:Date;
  const start = new Date(startDate);

  if(!endDate){
     end = new Date(Date.now());
  } else {
    end = new Date(endDate);
  }

  const startYear = start.getFullYear();
  const startMonth = start.getMonth();
  const startDay = start.getDate();

  const endYear = end.getFullYear();
  const endMonth = end.getMonth();
  const endDay = end.getDate();

  const utcStart = Date.UTC(startYear, startMonth, startDay);
  const utcEnd = Date.UTC(endYear, endMonth, endDay);

  const diffTime = Math.abs(utcEnd - utcStart);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

  const { years, months} = calculateTimimg(diffDays);

  if(years == 0 && months == 0){
    return `${diffDays} días`;
  }else if(years == 0){
    return `${months} meses`;
  } else if (months == 0){
    return `${years} años`;
  } else {
    return `${years} años y ${months} meses`;
  }
}