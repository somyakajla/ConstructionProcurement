import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';

import { CreateProjectComponent } from './project/create-project/create-project.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailsComponent } from './project/project-details/project-details.component';
import { BidComponent } from './bid/bid.component';


export const appRoutes: Routes = [
    {
        path: 'createProject', component: ProjectComponent,
        children: [{ path: '', component: CreateProjectComponent }]
    },
    {
        path: 'showProject', component: ProjectListComponent,
        children: [{ path: '', component: ProjectListComponent }]
    },
    {
        path: 'bidProject', component: BidComponent,
        children: [{ path: '', component: BidComponent }]
    },
    {
        path: 'projectDetails', component: ProjectDetailsComponent,
        children: [{ path: '', component: ProjectDetailsComponent }]
    }
];