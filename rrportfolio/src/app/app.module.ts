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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
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
      "startFromZero": false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
