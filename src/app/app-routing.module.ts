import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {path: '', redirectTo: 'department',pathMatch: 'full'},
  { path: 'department',loadChildren: () => import('./components/department/department.module').then(m => m.DepartmentModule)},
  { path: 'employee',loadChildren: () => import('./components/employee/employee.module').then(m => m.EmployeeModule)},
  { path: 'dynamic-form',loadChildren: () => import('./components/dynamic-form/dynamic-form.module').then(m => m.DynamicFormModule)},
  { path: '**', redirectTo: 'department' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
