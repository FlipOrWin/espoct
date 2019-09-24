import { Component, OnInit, DoCheck, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Especialidad} from '../../models/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';
import {Matricula} from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';
import {Cita} from '../../models/cita'; 
import { CitaService } from '../../services/cita.service'; 
import {Medicamento} from '../../models/medicamento'; 
import { MedicamentoService } from '../../services/medicamento.service';  
import {Receta} from '../../models/receta'; 
import { RecetaService } from '../../services/receta.service';  
import {Recmed} from '../../models/recmed'; 
import { RecmedService } from '../../services/recmed.service';  

@Component({
  selector: 'app-receta-detail',
  templateUrl: './receta-detail.component.html',
  styleUrls: ['./receta-detail.component.css'],
  providers: [UserService, EspecialidadService, MatriculaService, CitaService, RecetaService, RecmedService, MedicamentoService]
})
export class RecetaDetailComponent implements OnInit {
  
  public especialidades:Array<Especialidad>;
  public especialidad:Especialidad;
  public users: Array<User>;
  public matriculas: Array<Matricula>;
  public medicamentos: Array<Medicamento>;
  public recmeds: Array<Recmed>;
  public citas: Array<Cita>;
  public recetas: Array<Receta>;
  public receta: Receta;
  public matricula: Matricula;
  public cita: Cita;
  public user: User;
  public status_cita:string;
  public identity; 
  public token;
  public id;

  @ViewChild('content') content: ElementRef;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _especialidadService: EspecialidadService,
    private _citaService: CitaService,
    private _matriculaService: MatriculaService,
    private _medicamentoService: MedicamentoService,
    private _recetaService: RecetaService,
    private _recmedService: RecmedService
  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();  
  }

  ngOnInit() {
    
    this.getCitas(); 
    this.getUsers(); 
    this.getUser(); 
    this.getReceta();
    this.getRecetas();
    this.getRecmeds();
    this.getMedicamentos();
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public downloadPDF(){
    let doc = new jsPDF();

    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      'width': 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('receta.pdf');
  }

  getReceta(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._recetaService.getReceta(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.receta = response.receta;
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

  getUser(){
    this._route.params.subscribe(params => {
      let id = +params['id'];

      this._userService.getUser(id).subscribe(
        response => {
          if(response.status == 'success'){
            this.user = response.user;
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

  getCitas(){
    this._citaService.getCitas().subscribe(
        response => {
            if(response.status == 'success'){
                this.citas = response.citas;
            }

            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
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


}
 