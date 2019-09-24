import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MedicamentoService } from '../../services/medicamento.service';
import { Medicamento } from '../../models/medicamento';

@Component({
  selector: 'app-medicamento-new',
  templateUrl: './medicamento-new.component.html',
  styleUrls: ['./medicamento-new.component.css'],
  providers: [UserService, MedicamentoService]
})
export class MedicamentoNewComponent implements OnInit {
  public page_title: string;
  public identity; 
  public token;
  public medicamento: Medicamento;
  public status_medicamento:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _medicamentoService: MedicamentoService
    ) {
    this.page_title = 'Crear Nuevo Medicamento'
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken() 
  }

  ngOnInit() {
    if(this.identity == null){
      this._router.navigate(["/login"]);
    }else{
      // Crear Objeto Medicamento
      this.medicamento = new Medicamento(1, '', null, null);
    }
  }

  onSubmit(form){
    console.log(this.medicamento);
    this._medicamentoService.create(this.token, this.medicamento).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success'){
          this.medicamento = response.medicamento;
          this.status_medicamento = 'success';
          this._router.navigate(['home']);
        }else{
          this.status_medicamento = 'error';
        }
      }, 
      
      error=>{
        console.log(<any>error);
        this.status_medicamento='error';
      }
    );
  }
}
