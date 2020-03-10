import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from "./material/material.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';
import { ContractorComponent } from './contractor/contractor.component';
import { BidOnProjectComponent } from './bid-on-project/bid-on-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { AcceptWinningBidComponent } from './accept-winning-bid/accept-winning-bid.component';
import { ProgressTimelineComponent } from './progress-timeline/progress-timeline.component';
import { AddProgressComponent } from './add-progress/add-progress.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CompanyComponent,
    ContractorComponent,
    BidOnProjectComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    AcceptWinningBidComponent,
    ProgressTimelineComponent,
    AddProgressComponent,
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
