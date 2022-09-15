import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISkill } from 'src/interfaces/interfaces';
import { createID } from 'src/app/helpers/createID';
import { SkillsService } from 'src/app/services/skills.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  @Input() skill?: ISkill = {} as ISkill;
  @Input() addMode:boolean = false;
  @Output() onEdit = new EventEmitter<ISkill>();
  @Output() onAdd = new EventEmitter<ISkill>();
  @Output() onDelete = new EventEmitter<string>();

  addSkillForm: FormGroup
  skills: ISkill[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private skillService: SkillsService
  ) { }

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((skills:ISkill[]) => {
      this.skills = skills;
    })

    if(this.addMode){
      this.addSkillForm = this.formBuilder.group({
        id: [createID(), [Validators.required]],
        name: ['', [Validators.required]],
        icon: ['', [Validators.required]],
        abilityPercentage: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      })
    } else {
      this.addSkillForm = this.formBuilder.group({
        id: [this.skill?.id],
        name: [this.skill?.name, [Validators.required]],
        icon: [this.skill?.icon, [Validators.required]],
        abilityPercentage: [this.skill?.abilityPercentage, [Validators.required, Validators.min(1), Validators.max(100)]],
      })
    }
  }

  onCreateNewSkill(event:Event){
    event.preventDefault();

    if(this.addSkillForm.valid){
      this.onAdd.emit(this.addSkillForm.value);
    } else{
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
    
  }

  onClickDelete(event:Event){
    event.preventDefault(); 
    this.onDelete.emit(this.skill?.id.toString());
  }

  onEditSkill(event:Event){
    event.preventDefault();

    
    if(this.addSkillForm.valid){
      this.onEdit.emit(this.addSkillForm.value);
    } else{
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
  }

}
