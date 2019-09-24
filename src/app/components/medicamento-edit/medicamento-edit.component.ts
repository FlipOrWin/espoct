import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Medicamento} from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';


@Component({
  selector: 'app-medicamento-edit',
  templateUrl: '../medicamento-new/medicamento-new.component.html',
  styleUrls: ['./medicamento-edit.component.css'],
  providers: [UserService, MedicamentoService]
})
export class MedicamentoEditComponent implements OnInit {
  public page_title: string;
  public medicamento:Medicamento;
  public token;
  public status_medicamento;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _medicamentoService: MedicamentoService
    ) {
      this.token = this._userService.getToken();
    }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let id = +params['id'];
      this.getMedicamento(id);
    });
  }

  getMedicamento(id){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._medicamentoService.getMedicamento(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.medicamento = response.medicamento;
            this.page_title = 'Editar ' + this.medicamento.tittle;
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
    console.log(this.medicamento.id);
    this._medicamentoService.update(this.token, this.medicamento, this.medicamento.id).subscribe(
      response => {
        if(response.status == 'success'){
          this.status_medicamento == 'success';
          this.medicamento = response.medicamento;
          this._router.navigate(['/medicamento', this.medicamento.id]);
        }else{
          this.status_medicamento = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status_medicamento = 'error';
        
      }
    );
  }

}
