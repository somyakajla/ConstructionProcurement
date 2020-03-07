import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "./material/material.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project/project.component';
import { BidComponent } from './bid/bid.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { appRoutes } from './routes';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { BidOnProjectComponent } from './bid-on-project/bid-on-project.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';
import { ContractorComponent } from './contractor/contractor.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    BidComponent,
    CreateProjectComponent,
    ProjectListComponent,
    BidOnProjectComponent,
    ProjectDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CompanyComponent,
    ContractorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[LoginComponent]
})
export class AppModule { }
