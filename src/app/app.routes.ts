import { Routes } from '@angular/router';
import { ViewEmployeeComponent } from './Components/view-employee/view-employee.component';
import { CreateEmployeeComponent } from './Components/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './Components/update-employee/update-employee.component';

export const routes: Routes = [
    {path: '',component: ViewEmployeeComponent},
    {path: 'add', component: CreateEmployeeComponent},
    {path: 'update/:id', component:UpdateEmployeeComponent}

];
