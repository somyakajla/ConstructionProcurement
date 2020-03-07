import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { BidComponent } from './bid/bid.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';


export const appRoutes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: 'createProject', component: ProjectComponent,
        children: [{ path: '', component: CreateProjectComponent }]
    },
    {
        path: 'showProject', component: ProjectListComponent,
        children: [{ path: '', component: ProjectListComponent }]
    },
    {
        path: 'projects', component: ProjectListComponent,
        children: [{ path: '', component: ProjectListComponent }]
    },
    {
        path: 'bidProject', component: BidComponent,
        children: [{ path: '', component: BidComponent }]
    },
    {
        path: 'projectDetails', component: ProjectDetailsComponent,
        children: [{ path: '', component: ProjectDetailsComponent }]
    },
    {
        path: 'login', component: LoginComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: 'register', component: RegisterComponent,
        children: [{ path: '', component: RegisterComponent }]
    },
    {
        path: 'company', component: CompanyComponent,
        children: [{ path: '', component: CompanyComponent }]
    }
];