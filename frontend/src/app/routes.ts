import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CompanyComponent } from './company/company.component';
import { ContractorComponent } from './contractor/contractor.component';
import { AcceptWinningBidComponent } from './accept-winning-bid/accept-winning-bid.component';
import { ProgressTimelineComponent} from './progress-timeline/progress-timeline.component'
import { AuthGuard } from './helper/auth.guard';



export const appRoutes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full', canActivate: [AuthGuard]
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
        path: 'acceptBid', component: AcceptWinningBidComponent,
        children: [{ path: '', component: AcceptWinningBidComponent }]
    },
    {
        path: 'progressTimeline', component: ProgressTimelineComponent,
        children: [{ path: '', component: ProgressTimelineComponent }]
    },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];