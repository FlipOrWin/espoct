import { Component, OnInit, DoCheck } from '@angular/core';
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
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css'],
  providers: [UserService, EspecialidadService, MatriculaService, CitaService]
})
export class DoctorDetailComponent implements OnInit, DoCheck {
  public especialidades:Array<Especialidad>;
  public especialidad:Especialidad;
  public users: Array<User>;
  public matriculas: Array<Matricula>;
  public citas: Array<Cita>;
  public matricula: Matricula;
  public cita: Cita;
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
    private _matriculaService: MatriculaService) 
    { 
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken(); 
    }

  ngOnInit() {
    this.getEspecialidades();
    this.getUsers(); 
    this.getMatricula(); 
    this.identity;
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      // Crear Objeto Coche
      this.cita = new Cita(1, null, null, null, null, null, null, null);
    }
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getMatricula(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._matriculaService.getMatricula(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.matricula = response.matricula;
          }else{
            this._router.navigate(['home']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
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

  onSubmit(form){
    console.log(this.cita);
    this._citaService.create(this.token, this.cita).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.cita = response.cita;
          this.status_cita = 'success';
          this._router.navigate(['home']);
        }else{
          this.status_cita = 'error';
        }
      },

      error=>{
        console.log(<any>error);
        this.status_cita='error';
      }
    );
  }

}
