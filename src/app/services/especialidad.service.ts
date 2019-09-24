import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Especialidad} from '../models/especialidad';
import { User } from '../models/user';

@Injectable()
export class EspecialidadService {
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    pruebas(){
        return "Hola mundo!!"
    }

    create(token, especialidad: Especialidad): Observable<any>{
        let json = JSON.stringify(especialidad);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

        return this._http.post(this.url+'especialidades', params, {headers: headers});
    }

    getEspecialidad(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'especialidades/' + id , {headers: headers});

    }

    getEspecialidades(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'especialidades', {headers: headers});

    }
    
    update(token, especialidad, id): Observable<any>{
        let json = JSON.stringify(especialidad);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'especialidades/' + id, params, {headers:headers});
    }

    delete(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'especialidades/' + id, {headers:headers});
    }
} 