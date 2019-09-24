import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-receta-edit',
  templateUrl: './receta-edit.component.html',
  styleUrls: ['./receta-edit.component.css'],
  providers: [UserService,  EspecialidadService, MatriculaService, CitaService, RecetaService, MedicamentoService]
})
export class RecetaEditComponent implements OnInit {
  public token;
  public identity;
  public receta: Receta;
  public status_receta:string;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _citaService: CitaService,
    private _recetaService: RecetaService,) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken(); 
    }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getReceta(id);
      if(this.identity.role == 'paciente'){
        this._router.navigate(["/login"]);
      }else{
        // Crear Objeto Coche
        this.receta = new Receta(1, 1, 1, 1, '', null, null);
      }
    }); 
  } 

  getReceta(id){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._recetaService.getReceta(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.receta = response.receta;
          }else{
            this._router.navigate(['citas']);
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    });
  }

  onSubmit(form){
    console.log(this.receta.id);
    this._recetaService.update(this.token, this.receta, this.receta.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_receta == 'success';
          this.receta = response.receta;
          this._router.navigate(['/citas']);
        }else{
          this.status_receta = 'error';
        }
      },
      error => {
        console.log(<any>error);
        console.log("fucc");
        this.status_receta = 'error';
      }
    );
  }

}
