import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { EspecialidadNewComponent } from './components/especialidad-new/especialidad-new.component';
import { EspecialidadEditComponent } from './components/especialidad-edit/especialidad-edit.component';
import { EspecialidadDetailComponent } from './components/especialidad-detail/especialidad-detail.component';
import { MedicamentoNewComponent } from './components/medicamento-new/medicamento-new.component';
import { MedicamentoDetailComponent } from './components/medicamento-detail/medicamento-detail.component';
import { MedicamentoEditComponent } from './components/medicamento-edit/medicamento-edit.component';
import { MatriculaNewComponent } from './components/matricula-new/matricula-new.component';
import { WeaNewComponent } from './components/wea-new/wea-new.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { CitasTotalesComponent } from './components/citas-totales/citas-totales.component';
import { CitaDetailComponent } from './components/cita-detail/cita-detail.component';
import { CitaEditComponent } from './components/cita-edit/cita-edit.component';
import { RecetaEditComponent } from './components/receta-edit/receta-edit.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteDetailComponent } from './components/paciente-detail/paciente-detail.component';
import { RecetaDetailComponent } from './components/receta-detail/receta-detail.component';

import { CalendarComponent } from './components/calendar/calendar.component';


const appRoutes: Routes = [
  {path:'', component: DefaultComponent},
  {path:'home', component: DefaultComponent},
  {path:'login', component: LoginComponent},
  {path:'logout/:sure', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: 'crear-coche', component: CarNewComponent},
  {path: 'editar-coche/:id', component: CarEditComponent},
  {path: 'coche/:id', component: CarDetailComponent},
  {path: 'crear-especialidad', component: EspecialidadNewComponent},
  {path: 'especialidad/:id', component: EspecialidadDetailComponent},
  {path: 'editar-especialidad/:id', component: EspecialidadEditComponent},
  {path: 'crear-medicamento', component: MedicamentoNewComponent},
  {path: 'medicamento/:id', component: MedicamentoDetailComponent},
  {path: 'editar-medicamento/:id', component: MedicamentoEditComponent},
  {path: 'crear-matricula', component: MatriculaNewComponent},
  {path: 'crear-wea', component: WeaNewComponent},
  {path: 'matricula/:id', component: DoctorDetailComponent},
  {path: 'citas', component: CitasTotalesComponent},
  {path: 'pacientes', component: PacientesComponent},
  {path: 'paciente/:id', component: PacienteDetailComponent},
  {path: 'calendar', component: CalendarComponent},
  {path: 'editar-cita/:id', component: CitaEditComponent},
  {path: 'editar-receta/:id', component: RecetaEditComponent},
  {path: 'receta/:id', component: RecetaDetailComponent},
  {path: '**', component: DefaultComponent}
];

export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);