import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Cita} from '../models/cita'

@Injectable()
export class CitaService {
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    pruebas(){
        return "Hola mundo!!"
    }

    create(token, cita: Cita): Observable<any>{
        let json = JSON.stringify(cita);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

        return this._http.post(this.url+'citas', params, {headers: headers});
    }

    getCita(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'citas/' + id , {headers: headers});

    }

    getCitas(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'citas', {headers: headers});

    }
    
    update(token, cita, id): Observable<any>{
        let json = JSON.stringify(cita);
        let params = "json="+json; 

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'citas/' + id, params, {headers:headers});
    }

    delete(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'citas/' + id, {headers:headers});

    }
}