import { Component, OnInit } from '@angular/core';
import { unObjectSkill } from 'src/app/helpers/unObject';
import { SkillsService } from 'src/app/services/skills.service';
import { ISkill } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { SkillDto } from '../../../model/skill-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { Alerts } from 'src/model/Alerts';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.css']
})
export class SkillsSectionComponent implements OnInit {
  skills:ISkill[] = [];
  showEdit: boolean = false;
  showAdd: boolean = false;
  loggedIn:boolean = false;
  private idUser: number;
  private username: string|null;


  constructor(
    private skillService: SkillsService,
    private userService: UserService,
    private loginService: LoginService
  ) { 
    this.loginService.loggedIn.subscribe(res => this.loggedIn = res);
    if(this.loggedIn){
      this.username = window.sessionStorage.getItem('AuthUsername');
      this.userService.getUserByUsername(this.username as string).subscribe(res => this.idUser = res.id);
    }
  }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe(skills => {
      this.skills = skills.sort((a:ISkill,b:ISkill)=> b.abilityPercentage - a.abilityPercentage);
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
    const skillToPost = new SkillDto(skill.name, skill.icon, skill.abilityPercentage, this.idUser);
    this.skillService.postSkill(skillToPost).subscribe( (response) => {
      new Alerts('success', 'Added!', `Skill: ${skill.name} added`);
      this.onClickShowAdd();
      this.skills.push({...skill, id:response.id});
    },
      (error: HttpErrorResponse) => {
        new Alerts('error').showError();
      }
    );
  }

  editSkill(skill: ISkill){
    const skillToPut = new SkillDto(skill.name, skill.icon, skill.abilityPercentage, this.idUser);
    this.skillService.putSkill(skillToPut, skill.id).subscribe( (response) => {
      new Alerts('success', 'Edited!', `Skill: ${skill.name} edited`);
      this.skills = unObjectSkill(this.skills, skill);
      this.onClickShowEdit();
  },
  (error: HttpErrorResponse) => {
    new Alerts('error').showError();
  })


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
        this.skillService.deleteSkill(parseInt(id)).subscribe( (response) => {
          new Alerts('success', 'Deleted!', `Skill deleted`);
          this.skills = this.skills.filter(skill => skill.id !== parseInt(id));
        },
          (error: HttpErrorResponse) => {
            new Alerts('error').showError();
          }
        )


      }
    })
  }

}
