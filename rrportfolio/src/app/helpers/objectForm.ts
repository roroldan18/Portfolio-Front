export const objFormNotEmpty = (obj:Record<string, string>):Record<string, string> => {
  const finalObj:Record<string, string> = {};

  Object.keys(obj).forEach(element => {
    if (obj[element] !== '' && obj[element] !== null) {
      finalObj[element] = obj[element];
    }
});
return finalObj;
}