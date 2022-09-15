import { Component, OnInit } from '@angular/core';
import { unObjectEdu } from 'src/app/helpers/unObject';
import { EducationService } from 'src/app/services/education.service';
import { EducationDto } from 'src/model/education-dto';
import Swal from 'sweetalert2';
import { IEducation } from '../../../interfaces/interfaces';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent implements OnInit {
  education:IEducation[] = [];
  showAdd:boolean = false;
  loggedIn: boolean = false;
  private idUser: number;
  private username: string|null;


  constructor(
    private educationService:EducationService,
    private loginService: LoginService,
    private userService: UserService

  ) { 
    this.loginService.loggedIn.subscribe(res => this.loggedIn = res);
    if(this.loggedIn){
      this.username = window.sessionStorage.getItem('AuthUsername');
      this.userService.getUserByUsername(this.username as string).subscribe(res => this.idUser = res.id);
    }
  }

  ngOnInit(): void {
    this.educationService.getEducations().subscribe(education => {
      this.education = education;
    })
  }

  onShowAdd(){
    this.showAdd = !this.showAdd;
  }

  addEducation(education:IEducation){
    const educ = new EducationDto(education.careerTitle, education.educationalEstablishment, education.startDate, education.endDate, education.isActual, this.idUser, education.image);
    this.educationService.postEducation(educ);
    this.onShowAdd();
    this.education.unshift(education);
  }

  onEditEducation(education:IEducation){
    const educ = new EducationDto(education.careerTitle, education.educationalEstablishment, education.startDate, education.endDate, education.isActual, this.idUser, education.image);
    this.educationService.putEducation(educ, education.id);
    this.education = unObjectEdu(this.education, education);
  }

  onDeleteEducation(id:string){
    Swal.fire({
      title: 'Seguro que deseas eliminar la educación?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.educationService.deleteEducation(parseInt(id));
        this.education = this.education.filter(exp => exp.id !== parseInt(id));
      }
    })

  }

}
