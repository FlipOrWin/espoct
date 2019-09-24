import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EspecialidadService } from '../../services/especialidad.service';
import { Especialidad } from '../../models/especialidad';

@Component({
  selector: 'app-especialidad-new',
  templateUrl: './especialidad-new.component.html',
  styleUrls: ['./especialidad-new.component.css'],
  providers: [UserService, EspecialidadService]
})
export class EspecialidadNewComponent implements OnInit {
  public page_title: string;
  public identity; 
  public token;
  public especialidad: Especialidad;
  public status_especialidad:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _especialidadService: EspecialidadService
  ) { 
    this.page_title = 'Crear Nueva Especialidad'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      // Crear Objeto Coche
      this.especialidad = new Especialidad(1, '', null, null);
    }
  }

  onSubmit(form){
    console.log(this.especialidad); 
    this._especialidadService.create(this.token, this.especialidad).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.especialidad = response.especialidad;
          this.status_especialidad = 'success';
          this._router.navigate(['home']);
        }else{
          this.status_especialidad = 'error';
        }
      },
       
      error=>{
        console.log(<any>error);
        this.status_especialidad='error';
      }
    );
  }
}
