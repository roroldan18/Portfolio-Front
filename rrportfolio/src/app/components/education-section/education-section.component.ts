import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { unObjectEdu } from 'src/app/helpers/unObject';
import { EducationService } from 'src/app/services/education.service';
import { Alerts } from 'src/model/Alerts';
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
      this.education = education.sort((a: IEducation, b: IEducation) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    })

  }

  onShowAdd(){
    this.showAdd = !this.showAdd;
  }

  addEducation(education:IEducation){
    const educ = new EducationDto(education.careerTitle, education.educationalEstablishment, education.startDate, education.endDate, education.isActual, this.idUser, education.image);
    this.educationService.postEducation(educ).subscribe( (response) => {
      new Alerts('success', "Added!", `Education: ${education.careerTitle} added!`).showSuccess();
      this.onShowAdd();
      this.education.push({...education, id: response.id});
      this.education.sort((a: IEducation, b: IEducation) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    },
      (error: HttpErrorResponse) => {
        new Alerts("error").showError();
      }
    );
  }

  onEditEducation(education:IEducation){
    const educ = new EducationDto(education.careerTitle, education.educationalEstablishment, education.startDate, education.endDate, education.isActual, this.idUser, education.image);

    this.educationService.putEducation(educ, education.id).subscribe( (response) => {
      new Alerts('success', "Edited!", `Education: ${education.careerTitle} edited!`).showSuccess();
      this.education = unObjectEdu(this.education, education);
    },
      (error: HttpErrorResponse) => {
        new Alerts('error').showError();
      }
    );
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
        this.educationService.deleteEducation(parseInt(id)).subscribe( (response) => {
          new Alerts("success", "Deleted", "Education deleted").showSuccess();
          this.education = this.education.filter(exp => exp.id !== parseInt(id));
        },
          (error: HttpErrorResponse) => {
            new Alerts("error").showError();
          }
        );
      }
    })

  }

}
