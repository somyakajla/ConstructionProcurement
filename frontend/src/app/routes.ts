import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';
import { ContractorComponent } from './contractor/contractor.component';
import { UpdateProjectComponent } from './update-project/update-project.component';


export const appRoutes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
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
    },
    {
        path: 'contractor', component: ContractorComponent,
        children: [{ path: '', component: CompanyComponent }]
    },
    {
        path: 'update', component: UpdateProjectComponent,
        children: [{ path: '', component: UpdateProjectComponent }]
    }
];