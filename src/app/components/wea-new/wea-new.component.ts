import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { WeaService } from '../../services/wea.service';
import { Wea } from '../../models/wea';

@Component({
  selector: 'app-wea-new',
  templateUrl: './wea-new.component.html',
  styleUrls: ['./wea-new.component.css'],
  providers: [UserService, WeaService]
})
export class WeaNewComponent implements OnInit {
  public page_title: string;
  public identity; 
  public token;
  public wea: Wea;
  public status_wea:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _weaService: WeaService
    ) {
      this.page_title = 'Crear Nuevo Wea'
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken()  
    }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      // Crear Objeto Medicamento
      this.wea = new Wea(1, 0, 0, null, null);
    }
  }

  onSubmit(form){
    console.log(this.wea);
    this._weaService.create(this.token, this.wea).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.wea = response.wea;
          this.status_wea = 'success';
          this._router.navigate(['home']);
        }else{
          this.status_wea = 'error';
        }
      }, 
      
      error=>{
        console.log(<any>error);
        this.status_wea='error';
      }
    );
  }
 //nota si el fuck falla checar la seccion de error
 //puede que se te olvidara poner las tablas autoincrementables
}
