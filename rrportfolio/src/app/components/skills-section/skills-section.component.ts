import { Component, OnInit } from '@angular/core';
import { unObjectSkill } from 'src/app/helpers/unObject';
import { SkillsService } from 'src/app/services/skills.service';
import { ISkill } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit {
  skills:ISkill[] = [];
  showEdit: boolean = false;
  showAdd: boolean = false;


  constructor(
    private skillService: SkillsService
  ) { }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills;
    })
  }

  onClickShowEdit(){
    this.showEdit = !this.showEdit;
    this.showAdd = false;
  }

  onClickShowAdd(){
    this.showEdit = false;
    this.showAdd = !this.showAdd;
  }

  addSkill(skill: ISkill){
    this.skillService.postSkill(skill);
    this.onClickShowAdd();
    this.skills.unshift(skill);
  }
  editSkill(skill: ISkill){
    this.skillService.putSkill(skill);
    this.skills = unObjectSkill(this.skills, skill);
    this.onClickShowEdit();
  }

  deleteSkill(id: string){
    Swal.fire({
      title: 'Seguro que deseas eliminar la habilidad?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'La habilidad fue eliminada.',
          'success'
        )
        this.skillService.deleteSkill(id);
        this.skills = this.skills.filter(skill => skill.id !== id);
      }
    })
  }

}
