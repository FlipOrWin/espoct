import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Especialidad} from '../../models/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';

@Component({
  selector: 'app-especialidad-edit',
  templateUrl: '../especialidad-new/especialidad-new.component.html',
  styleUrls: ['./especialidad-edit.component.css'],
  providers: [UserService, EspecialidadService]
})
export class EspecialidadEditComponent implements OnInit {
  public page_title: string;
  public especialidad:Especialidad;
  public token;
  public status_especialidad;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _especialidadService: EspecialidadService
    ) {
      this.token = this._userService.getToken();
    }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getEspecialidad(id);
    });
  }

  getEspecialidad(id){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._especialidadService.getEspecialidad(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.especialidad = response.especialidad;
            this.page_title = 'Editar ' + this.especialidad.tittle;
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
    console.log(this.especialidad.id);
    this._especialidadService.update(this.token, this.especialidad, this.especialidad.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_especialidad == 'success';
          this.especialidad = response.especialidad;
          this._router.navigate(['/especialidad', this.especialidad.id]);
        }else{
          this.status_especialidad = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status_especialidad = 'error';
      }
    );
  }
 
}
