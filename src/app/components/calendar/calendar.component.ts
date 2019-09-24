import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgModule } from '@angular/core'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { CalendarModule, DateAdapter } from 'angular-calendar'; 
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { filter } from 'rxjs/operators';

import {Router, ActivatedRoute, Params } from '@angular/router'; 
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Especialidad} from '../../models/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';
import {Matricula} from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';
import {Cita} from '../../models/cita';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [UserService, EspecialidadService, MatriculaService, CitaService]
})
 
@NgModule({ 
  imports: [ BrowserAnimationsModule, 
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }) ] })
     

export class CalendarComponent implements OnInit {
  public especialidades:Array<Especialidad>;
  public especialidad:Especialidad;
  public users: Array<User>;
  public matriculas: Array<Matricula>;
  public matricula: Matricula;
  public citas: Array<Cita>;
  public citasdoc: Array<Cita>;
  public cita: Cita;
  public Date = new Date();
 

  calendarEvents:any[]=[
  ]
  calendarPlugins=[dayGridPlugin];

  
  public status_cita:string;
  public identity; 
  public token;
  public id;
  

  constructor(
    private _userService: UserService, 
    private _route: ActivatedRoute,
    private _router: Router,
    private _especialidadService: EspecialidadService,
    private _citaService: CitaService,
    private _matriculaService: MatriculaService,
    private svc: CitaService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken(); 
   }

  ngOnInit() {
    this.getEspecialidades();
    this.getUsers(); 
    this.getCitas();

    
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  

  getUsers(){
    this._userService.getUsers().subscribe(
        response => {
            if(response.status == 'success'){
                this.users = response.users;
            }

            console.log(response);
        },
        error => { 
            console.log(error);
        }
    );
  }

          
      
    
  

  getCitas(){
    this._citaService.getCitas().subscribe(
        response => {
            if(response.status == 'success'){
                this.citas = response.citas;
                this.citas = this.citas.filter(cita => cita.userdoc === this.identity.sub)
            }

            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
  }

  getEspecialidades(){
    this._especialidadService.getEspecialidades().subscribe(
        response => {
            if(response.status == 'success'){
                this.especialidades = response.especialidades;
            }

            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
  }
}
