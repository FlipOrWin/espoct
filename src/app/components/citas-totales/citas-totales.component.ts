import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';
import {Car} from '../../models/car';
import { CarService } from '../../services/car.service';
import {Especialidad} from '../../models/especialidad';
import { EspecialidadService } from '../../services/especialidad.service';
import {Medicamento} from '../../models/medicamento';
import { MedicamentoService } from '../../services/medicamento.service';
import {Matricula} from '../../models/matricula';
import { MatriculaService } from '../../services/matricula.service';
import { Cita } from 'src/app/models/cita';
import { CitaService } from '../../services/cita.service';

@Component({
  selector: 'app-citas-totales',
  templateUrl: './citas-totales.component.html',
  styleUrls: ['./citas-totales.component.css'],
  providers: [UserService, CarService, EspecialidadService, MedicamentoService, MatriculaService, CitaService]
})
export class CitasTotalesComponent implements OnInit {
  public title: string;
  public cars: Array<Car>;
  public citas: Array<Cita>;
  public users: Array<User>;
  public especialidades: Array<Especialidad>; 
  public medicamentos: Array<Medicamento>;
  public matriculas: Array<Matricula>;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _carService: CarService,
    private _especialidadService: EspecialidadService,
    private _medicamentoService: MedicamentoService,
    private _citaService: CitaService,
    private _matriculaService: MatriculaService
  ) {
    this.title = 'Mis citas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log('default.component cargado correctamente!!');
    this.getCars();
    this.getEspecialidades();
    this.getMedicamentos(); 
    this.getUsers();
    this.getMatriculas(); 
    this.getCitas();
  }

    ngDoCheck(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

    getCars(){
        this._carService.getCars().subscribe(
            response => {
                if(response.status == 'success'){
                    this.cars = response.cars;
                }

                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }

    getEspecialidades(){
        this._especialidadService.getEspecialidades().subscribe(
            response => {
                if(response.status == 'success'){
                    this.especialidades = response.especialidades;
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

    getMatriculas(){
        this._matriculaService.getMatriculas().subscribe(
            response => {
                if(response.status == 'success'){
                    this.matriculas = response.matriculas;
                }

                console.log(response);
            },
            error => {
                console.log(error);
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

    deleteCar(id){
        this._carService.delete(this.token, id).subscribe(
            response => {
                this._router.navigate['home'];
                this.getCars();
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    deleteEspecialidad(id){
        this._especialidadService.delete(this.token, id).subscribe(
            response => {
                this._router.navigate['home'];
                this.getEspecialidades();
            },
            error => {
                console.log(<any>error);
            }
        );
    }

    deleteMedicamento(id){
        this._medicamentoService.delete(this.token, id).subscribe(
            response => {
                this._router.navigate['home'];
                this.getMedicamentos();
            },
            error => {
                console.log(<any>error);
            }
        );
    } 

    deleteMatricula(id){
        this._matriculaService.delete(this.token, id).subscribe(
            response => {
                this._router.navigate['home'];
                this.getMatriculas();
            },
            error => {
                console.log(<any>error);
            }
        );
    } 

}
