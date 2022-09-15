export interface ISocialNetworkIcon {
  id: number,
  url: string,
  downloadable: boolean,
  icon: string,
  name: string,
  idUser: IUser['id'],
}

export interface IPersonalInfo {
  id: number,
  idUser: IUser['id'],
  bannerImage: string,
  profileImage: string,
  name: string,
  lastName: string,
  telephone: string,
  email: string,
  title: string,
  province: string,
  country: string,
  aboutMe:string,
  logo: string,
}

enum typeWork {
  FullTime = 'Full Time',
  PartTime = 'Part Time',
  Freelance = 'Freelance',
}

export interface IExperience {
  id: number,
  company: string,
  title: string,
  description: string
  timeWork: typeWork,
  startDate: Date,
  endDate?: Date,
  isActual: boolean,
  idUser: IUser['id'],
  logo:string
}


export interface IEducation {
  id: number,
  careerTitle:string,
  educationalEstablishment: string,
  image?: string,
  startDate: Date,
  endDate: Date, 
  idUser: IUser['id'],
  isActual: boolean,
}

export interface ISkill {
  id: number,
  name: string,
  icon: string,
  abilityPercentage: number,
  idUser: IUser['id'],
}


export interface IPortfolio {
  id: number,
  name: string,
  description: string,
  image: string,
  url: string,
  idUser: IUser['id'],
  startDate:Date,
  endDate:Date,
}

export interface IUser {
  id: number,
  username: string,
  password: string,
  roles: string[]
}
