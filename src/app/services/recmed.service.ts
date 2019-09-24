import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Recmed} from '../models/recmed';

@Injectable()
export class RecmedService {
    public url: string;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    pruebas(){
        return "Hola mundo!!"
    }

    create(token, recmed: Recmed): Observable<any>{
        let json = JSON.stringify(recmed);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);

        return this._http.post(this.url+'recmeds', params, {headers: headers});
    }

    getRecmed(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'recmeds/' + id , {headers: headers});

    }
 
    getRecmeds(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url+'recmeds', {headers: headers});

    }
    
    update(token, recmed, id): Observable<any>{
        let json = JSON.stringify(recmed);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.put(this.url + 'recmeds/' + id, params, {headers:headers});
    }

    delete(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.delete(this.url + 'recmeds/' + id, {headers:headers});

    }
}