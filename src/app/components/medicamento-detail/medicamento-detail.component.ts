import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Medicamento} from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';

@Component({
  selector: 'app-medicamento-detail',
  templateUrl: './medicamento-detail.component.html',
  styleUrls: ['./medicamento-detail.component.css'],
  providers: [UserService, MedicamentoService]
}) 
export class MedicamentoDetailComponent implements OnInit {
  public medicamento:Medicamento;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _medicamentoService: MedicamentoService
    ) { }

  ngOnInit() { 
    this.getMedicamento();
  }

  getMedicamento(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._medicamentoService.getMedicamento(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.medicamento = response.medicamento;
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

}
