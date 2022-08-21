export interface ISocialNetworkIcon {
  url: string,
  downloadable: boolean,
  icon: string,
  name: string,
}

export interface IPersonalInfo {
  idProfile: string,
  idUser: string,
  banner_image: string,
  profile_image: string,
  name: string,
  last_name: string,
  email: string,
  title: string,
  province: string,
  country: string,
  about_me:string,
  logo: string,
}

enum typeWork {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Freelance = 'Freelance',
}

export interface IExperience {
  id: string,
  company: string,
  title: string,
  description: string
  time_work: typeWork,
  start_date: string,
  end_date?: string,
  isActual: boolean,
  idUser: string,
  logo?:string
}


export interface IEducation {
  idEducation: string,
  career_title:string,
  educational_establishment: string,
  image: string,
  start_date: string,
  end_date: string, 
  user_iduser: string,
  isActual: boolean,
}

export interface ISkill {
  idSkill: string,
  name: string,
  icon?: string,
  ability_percentage: number,
  user_iduser: string,
}


export interface IPortfolio {
  idPortfolio: string,
  name: string,
  description: string,
  image: string,
  url: string,
  user_iduser: string,
  start_date:string,
  end_date:string,
}
