import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconComponent } from './components/icon/icon.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { ErrorComponent } from './pages/error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InfoContactComponent } from './components/info-contact/info-contact.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import { AddExperienceComponent } from './components/add-experience/add-experience.component';
import { SingleExperienceComponent } from './components/single-experience/single-experience.component';
import { AddEducationComponent } from './components/add-education/add-education.component';
import { SingleEducationComponent } from './components/single-education/single-education.component';
import { AddSkillComponent } from './components/add-skill/add-skill.component';
import { AddPortfolioComponent } from './components/add-portfolio/add-portfolio.component';
import { SinglePortfolioComponent } from './components/single-portfolio/single-portfolio.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    IconComponent,
    MainSectionComponent,
    AboutSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillsSectionComponent,
    PortfolioComponent,
    FooterComponent,
    LoginComponent,
    MainPageComponent,
    ErrorComponent,
    InfoContactComponent,
    AddExperienceComponent,
    SingleExperienceComponent,
    AddEducationComponent,
    SingleEducationComponent,
    AddSkillComponent,
    AddPortfolioComponent,
    SinglePortfolioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    NgbModule,
    MatDialogModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgCircleProgressModule.forRoot({
      "backgroundPadding": -50,
      "radius": 47,
      "space": 4,
      "outerStrokeWidth": 5,
      "outerStrokeColor": "#0008ff",
      "innerStrokeColor": "#e0f9ff",
      "innerStrokeWidth": 2,
      "titleFontSize": "22",
      "showSubtitle": false,
      "showBackground": false,
      "startFromZero": false}),
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
