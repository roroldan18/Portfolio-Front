import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createID } from 'src/app/helpers/createID';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';
import Swal from 'sweetalert2';
import { IconService } from '../../services/icon.service';

@Component({
  selector: 'app-add-social-network',
  templateUrl: './add-social-network.component.html',
  styleUrls: ['./add-social-network.component.css']
})
export class AddSocialNetworkComponent implements OnInit {
  @Input() socialNetwork?: ISocialNetworkIcon = {} as ISocialNetworkIcon;
  @Input() addMode:boolean = false;
  @Output() onEdit = new EventEmitter<ISocialNetworkIcon>();
  @Output() onAdd = new EventEmitter<ISocialNetworkIcon>();
  @Output() onDelete = new EventEmitter<string>();

  addSocialNetworkForm: FormGroup
  socialNetworks: ISocialNetworkIcon[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private socialNetworkService: IconService
  ) { }

  ngOnInit(): void {
    this.socialNetworkService.getSocialNetwork().subscribe((socialNetworks: ISocialNetworkIcon[]) => {
      this.socialNetworks = socialNetworks;
    })

    if(this.addMode){
      this.addSocialNetworkForm = this.formBuilder.group({
        id: [createID(), [Validators.required]],
        url: ['', [Validators.required]],
        downloadable: [false, [Validators.required]],
        name: ['', [Validators.required]],
        icon: ['', [Validators.required]],
      })
    } else {
      this.addSocialNetworkForm = this.formBuilder.group({
        id: [this.socialNetwork?.id, [Validators.required]],
        url: [this.socialNetwork?.url, [Validators.required]],
        downloadable: [this.socialNetwork?.downloadable, [Validators.required]],
        name: [this.socialNetwork?.name, [Validators.required]],
        icon: [this.socialNetwork?.icon, [Validators.required]],
      })
    }
  }

  onCreateNewSN(event:Event){
    event.preventDefault();

    if(this.addSocialNetworkForm.valid){
      this.onAdd.emit(this.addSocialNetworkForm.value);
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
    this.onDelete.emit(this.socialNetwork?.id.toString());
  }

  onEditSN(event:Event){
    event.preventDefault();
    if(this.addSocialNetworkForm.valid){
      this.onEdit.emit(this.addSocialNetworkForm.value);
    } else{
      Swal.fire(
        'Form Invalid!',
        'Some value is missing',
        'error'
      )
    }
  }


}
