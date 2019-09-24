import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Receta} from '../models/receta';

@Injectable()
export class RecetaService {
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    pruebas(){
        return "Hola mundo!!"
    }

    create(token, receta: Receta): Observable<any>{
        let json = JSON.stringify(receta);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

        return this._http.post(this.url+'recetas', params, {headers: headers});
    }

    getReceta(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'recetas/' + id , {headers: headers});

    }
 
    getRecetas(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'recetas', {headers: headers});

    }
    
    update(token, receta, id): Observable<any>{
        let json = JSON.stringify(receta);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'recetas/' + id, params, {headers:headers});
    }

    delete(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'recetas/' + id, {headers:headers});

    }
}