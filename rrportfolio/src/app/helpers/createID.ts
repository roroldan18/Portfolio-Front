import { v4 as uuidv4 } from 'uuid';

export const createID = ():string => {
  return uuidv4();
}