import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ISocialNetworkIcon } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() url: ISocialNetworkIcon['url'] = '';
  @Input() downloadable: ISocialNetworkIcon['downloadable'] = false;
  @Input() icon: ISocialNetworkIcon['icon']='';
  @Input() name: ISocialNetworkIcon['name']='';
  download: string = this.downloadable.toString();


  constructor(
    private elementRef: ElementRef
  ) {
    if(this.downloadable){
      this.elementRef.nativeElement.setAttribute('download', this.name);
    } else {
      this.elementRef.nativeElement.removeAttribute('download');
    }
   }

  ngOnInit(
  ): void {
    
  }

}
