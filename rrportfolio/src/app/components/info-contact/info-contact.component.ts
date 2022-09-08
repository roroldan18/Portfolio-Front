import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainSectionComponent } from '../main-section/main-section.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-contact',
  templateUrl: './info-contact.component.html',
  styleUrls: ['./info-contact.component.css']
})
export class InfoContactComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MainSectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }

  ngOnInit(): void {
    
  }

}
