import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Especialidad} from '../../models/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';
import {Matricula} from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';

@Component({
  selector: 'app-especialidad-detail',
  templateUrl: './especialidad-detail.component.html',
  styleUrls: ['./especialidad-detail.component.css'],
  providers: [UserService, EspecialidadService, MatriculaService]
})
export class EspecialidadDetailComponent implements OnInit, DoCheck {
  public especialidad:Especialidad;
  public users: Array<User>;
  public matriculas: Array<Matricula>;
  public matricula: Matricula;
  public status_matricula:string;
  public identity; 
  public token;
  public id;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _especialidadService: EspecialidadService,
    private _matriculaService: MatriculaService
    ) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken(); 
    }

  ngOnInit() {
    this.getEspecialidad();
    this.getUsers(); 
    this.getMatriculas(); 
    
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      // Crear Objeto Coche
      this.matricula = new Matricula(1, null, null, null, null);
    }
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getEspecialidad(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._especialidadService.getEspecialidad(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.especialidad = response.especialidad;
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

  getMatriculas(){
    this._matriculaService.getMatriculas().subscribe(
        response => {
            if(response.status == 'success'){
                this.matriculas = response.matriculas;
            }

            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
}

  onSubmit(form){
    console.log(this.matricula);
    this._matriculaService.create(this.token, this.matricula).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.matricula = response.matricula;
          this.status_matricula = 'success';
          this._router.navigate(['home']);
        }else{
          this.status_matricula = 'error';
        }
      },

      error=>{
        console.log(<any>error);
        this.status_matricula='error';
      }
    );
  }


} 
