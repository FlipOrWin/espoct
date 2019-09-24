import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Cita } from 'src/app/models/cita';
import { CitaService } from './services/cita.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CitaService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'client-angular';
  public identity;
  public token;
  public pendientes;
  public aprovadas;
  public citas: Array<Cita>;
  public cita: Cita;
  public citascounter: Number;

  constructor(
    private _userService: UserService,
    private _citaService: CitaService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    console.log('app.component cargado')
    this.getCitas(this.identity, this.citas, this.citascounter);
    this.showSucces(this.identity, this.citas, this.citascounter);
    
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    
  }

  showSucces(identity, citas, citascounter){
    if(this.identity.role == 'paciente'){
        this.citascounter = 0;
        for(let cita of citas){
            if(cita.status == 'aprobada'){
                if(cita.title == identity.sub){
                    this.citascounter = citascounter + 1;
                }
            }
        }
    }
  }
  getCitas(identity, citas, citascounter){
    this._citaService.getCitas().subscribe(
        response => {
            if(response.status == 'success'){
                this.citas = response.citas;  
                
                this.showSucces(this.identity, this.citas, this.citascounter);
            
            } 
            console.log(response);
        },
        error => {
            console.log(error);
        }
    );
  } 
}
