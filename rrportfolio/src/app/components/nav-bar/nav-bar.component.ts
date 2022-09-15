import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';
import { SocialNetworkDto } from 'src/model/social-network-dto';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { unObjectSocNet } from 'src/app/helpers/unObject';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  socialNetworks: ISocialNetworkIcon[] = [];
  showEditNetwork:boolean = true;
  showEdit: boolean = false;
  showAdd: boolean = false;
  username: string|null;
  idUser: number;

  constructor(
    private service:IconService,
    private tokenService: TokenService,
    private socialNetworkService: IconService,
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
    this.service.getSocialNetwork().subscribe(data => {
      this.socialNetworks = data;
    });
  }

  onClickShowAdd(){
    this.showEdit = false;
    this.showAdd = !this.showAdd;
  }

  onClickShowEdit(){
    this.showEdit = !this.showEdit;
    this.showAdd = false;
  }

  onLogout(){
    this.tokenService.logout();
    this.loginService.loggedIn.next(false);
  }

  editSocialNetwork(socialNetwork:ISocialNetworkIcon){
    const socNewToPost = new SocialNetworkDto(socialNetwork.url, socialNetwork.icon, socialNetwork.name, socialNetwork.downloadable, this.idUser);
    this.socialNetworkService.putSocNet(socNewToPost, socialNetwork.id);
    this.socialNetworks = unObjectSocNet(this.socialNetworks, socialNetwork);
  }
  createSocialNetwork(socialNetwork:ISocialNetworkIcon){
    const socNewToPost = new SocialNetworkDto(socialNetwork.url, socialNetwork.icon, socialNetwork.name, socialNetwork.downloadable, this.idUser);
    this.socialNetworkService.postSocNet(socNewToPost);
    this.socialNetworks.unshift(socialNetwork);
  }
  deleteSocialNetwork(id:string){
    Swal.fire({
      title: 'Seguro que deseas eliminar la Red Social?',
      text: "No podrás revertirlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.socialNetworkService.deleteSocNet(id);
        this.socialNetworks = this.socialNetworks.filter(sn => sn.id !== parseInt(id));
      }
    })
  }

}
