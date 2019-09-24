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
import {Receta} from '../../models/receta';
import { RecetaService } from '../../services/receta.service';
import { Medicamento } from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';
import {Recmed} from '../../models/recmed';
import { RecmedService } from '../../services/recmed.service';
 
@Component({
  selector: 'app-cita-edit',
  templateUrl: './cita-edit.component.html',
  styleUrls: ['./cita-edit.component.css'],
  providers: [UserService, RecmedService, EspecialidadService, MatriculaService, CitaService, RecetaService, MedicamentoService]
})
export class CitaEditComponent implements OnInit {
  public page_title: string;
  public cita:Cita;
  public users: Array<User>;
  public recetas: Array<Receta>;
  public recmeds: Array<Recmed>;
  public medicamentos: Array<Medicamento>;
  public token;
  public identity;
  public status_cita;
  public receta: Receta;
  public status_receta:string;
  public medicamento: Medicamento;
  public status_medicamento:string;
  public recmed: Recmed;
  public status_recmed:string;
  public myDate = new Date();


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _citaService: CitaService,
    private _recetaService: RecetaService,
    private _recmedService: RecmedService,
    private _medicamentoService: MedicamentoService
    ) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken(); 
    }

  ngOnInit() {
    
    this.getUsers();
    this.getRecetas();
    this.getRecmeds();
    this.getMedicamentos();
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getCita(id);
    }); 
    if(this.identity == null){
      this._router.navigate(["/login"]);
      
    }
    else if(this.identity == 'paciente'){
      this._router.navigate(["/home"]);
    }
    else{
      // Crear Objeto 
      this.receta = new Receta(1, 1, 1, 1, '', null, null);
      this.recmed = new Recmed(1, null, 1, 0, null, null);
    }
  }

  getRecetas(){
    this._recetaService.getRecetas().subscribe(
        response => {
            if(response.status == 'success'){
                this.recetas = response.recetas;
            }

            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
  }

  getRecmeds(){
    this._recmedService.getRecmeds().subscribe(
        response => {
            if(response.status == 'success'){
                this.recmeds = response.recmeds;
            }
            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
  }

  getMedicamentos(){
    this._medicamentoService.getMedicamentos().subscribe(
        response => {
            if(response.status == 'success'){
                this.medicamentos = response.medicamentos;
            }

            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
  }



  getCita(id){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._citaService.getCita(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.cita = response.cita;
            this.page_title = 'Editar Cita';
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

  onSubmit(form){
    console.log(this.cita.id);
    this._citaService.update(this.token, this.cita, this.cita.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_cita == 'success';
          this.cita = response.cita;
          this._router.navigate(['/citas']);
        }else{
          this.status_cita = 'error';
        }
      },
      error => {
        console.log(<any>error);
        console.log("fucc");
        this.status_cita = 'error';
      }
    );
  }

  onSubmitRM(form){
    console.log(this.recmed.id);
    this._recmedService.create(this.token, this.recmed).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_recmed == 'success';
          this.recmed = response.recmed;
          this._router.navigate(['/citas']);
        }else{
          this.status_recmed = 'error';
        }
      },
      error => {
        console.log(<any>error);
        console.log("fucc");
        this.status_recmed = 'error';
      }
    );
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

  onSubmitR(form){
    console.log(this.receta); 
    this._recetaService.create(this.token, this.receta).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.receta = response.receta;
          this.status_receta = 'success';
          this._router.navigate(['citas']);
        }else{
          this.status_receta = 'error';
        }
      },
       
      error=>{
        console.log(<any>error);
        this.status_receta='error';
      }
    );
  }

  deleteRecmed(id){
    this._recmedService.delete(this.token, id).subscribe(
        response => {
            this._router.navigate['home'];
            this.getRecmeds();
        },
        error => {
            console.log(<any>error);
        }
    );
} 

}
