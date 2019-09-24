import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Matricula} from '../models/matricula';
import { User } from '../models/user';

@Injectable()
export class MatriculaService {
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }
 
    pruebas(){
        return "Hola mundo!!"
    }

    create(token, matricula: Matricula): Observable<any>{
        let json = JSON.stringify(matricula);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

        return this._http.post(this.url+'matriculas', params, {headers: headers});
    }

    getMatricula(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'matriculas/' + id , {headers: headers});

    }

    getMatriculas(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'matriculas', {headers: headers});

    }
    
    update(token, matricula, id): Observable<any>{
        let json = JSON.stringify(matricula);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'matriculas/' + id, params, {headers:headers});
    }

    delete(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'matriculas/' + id, {headers:headers});
    }
} 