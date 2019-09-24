import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatriculaService } from '../../services/matricula.service';
import { Matricula } from '../../models/matricula';

@Component({
  selector: 'app-matricula-new',
  templateUrl: './matricula-new.component.html',
  styleUrls: ['./matricula-new.component.css'],
  providers: [UserService, MatriculaService]
})
export class MatriculaNewComponent implements OnInit {
  public page_title: string;
  public identity; 
  public token;
  public matricula: Matricula;
  public status_matricula:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _matriculaService: MatriculaService
    ) {
    this.page_title = 'Crear Nueva Matricula'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      // Crear Objeto Coche
      this.matricula = new Matricula(1, 1, 1, null, null);
    }
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
