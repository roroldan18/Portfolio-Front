import { Component, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/icon.service';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedIn: boolean = false;
  socialNetworks: ISocialNetworkIcon[] = [];

  constructor(
    private service:IconService
    ) { }

  ngOnInit(): void {
    this.service.getIcons().subscribe(data => {
      this.socialNetworks = data;
    });
  }

}
