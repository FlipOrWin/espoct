import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service'
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    providers: [UserService]
})
export class RegisterComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public identity; 

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Registrate';
        this.identity = this._userService.getIdentity();
        this.user = new User(1, 'ROLE_USER', '', '', '', '');
        
    }

    ngOnInit(){
        console.log('register.component cargado correctamente!!');
    }

    onSubmit(form){
        console.log(this.user);
        console.log(this._userService.pruebas());
        this._userService.register(this.user).subscribe(
            response => {
                
                if(response.status == 'success'){
                    //vaciar formulario
                    this.status = response.status;
                    this.user = new User(1, '', '', '', '', '');    
                    form.reset();
                }else{
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }

        );
    }
}