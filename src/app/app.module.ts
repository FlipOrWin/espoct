import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {routing, AppRoutingProviders} from './app-routing.module';
import {FullCalendarModule} from '@fullcalendar/angular';


// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DefaultComponent } from './components/default/default.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { EspecialidadDetailComponent } from './components/especialidad-detail/especialidad-detail.component';
import { EspecialidadEditComponent } from './components/especialidad-edit/especialidad-edit.component';
import { EspecialidadNewComponent } from './components/especialidad-new/especialidad-new.component';
import { MedicamentoNewComponent } from './components/medicamento-new/medicamento-new.component';
import { MedicamentoEditComponent } from './components/medicamento-edit/medicamento-edit.component';
import { MedicamentoDetailComponent } from './components/medicamento-detail/medicamento-detail.component';
import { MatriculaNewComponent } from './components/matricula-new/matricula-new.component';
import { WeaNewComponent } from './components/wea-new/wea-new.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { CitasTotalesComponent } from './components/citas-totales/citas-totales.component';
import { CitasAprovadasComponent } from './components/citas-aprovadas/citas-aprovadas.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CitaDetailComponent } from './components/cita-detail/cita-detail.component';
import { CitaEditComponent } from './components/cita-edit/cita-edit.component';
import { RecetaEditComponent } from './components/receta-edit/receta-edit.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { PacienteDetailComponent } from './components/paciente-detail/paciente-detail.component';
import { RecetaDetailComponent } from './components/receta-detail/receta-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultComponent,
    CarNewComponent,
    CarEditComponent,
    CarDetailComponent,
    EspecialidadDetailComponent,
    EspecialidadEditComponent,
    EspecialidadNewComponent,
    MedicamentoNewComponent,
    MedicamentoEditComponent,
    MedicamentoDetailComponent,
    MatriculaNewComponent,
    WeaNewComponent,
    DoctorDetailComponent,
    CitasTotalesComponent,
    CitasAprovadasComponent,
    CalendarComponent,
    CitaDetailComponent,
    CitaEditComponent,
    RecetaEditComponent,
    PacientesComponent,
    PacienteDetailComponent,
    RecetaDetailComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    FullCalendarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AppRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
