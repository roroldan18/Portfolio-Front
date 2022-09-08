import { Component, OnInit } from '@angular/core';
import { unObjectEdu } from 'src/app/helpers/unObject';
import { EducationService } from 'src/app/services/education.service';
import Swal from 'sweetalert2';
import { IEducation } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent implements OnInit {
  education:IEducation[] = [];
  showAdd:boolean = false;

  constructor(
    private educationService:EducationService
  ) { }

  ngOnInit(): void {
    this.educationService.getEducations().subscribe(education => {
      this.education = education;
    })
  }

  onShowAdd(){
    this.showAdd = !this.showAdd;
  }

  addEducation(education:IEducation){
    this.educationService.postEducation(education);
    this.onShowAdd();
    this.education.unshift(education);
  }

  onEditEducation(education:IEducation){
    this.educationService.putEducation(education);
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
        Swal.fire(
          'Borrado!',
          'La educación fue eliminada.',
          'success'
        )
        this.educationService.deleteEducation(id);
        this.education = this.education.filter(exp => exp.id !== id);
      }
    })

  }

}
