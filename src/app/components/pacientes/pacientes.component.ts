import { Component, OnInit, DoCheck } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  providers: [UserService]
})
export class PacientesComponent implements OnInit {
  public users: Array<User>;
  public token;
  public identity;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router) {
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
     }

  ngOnInit() {
    console.log('default.component cargado correctamente!!');
    this.getUsers();
  } 

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
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

}
