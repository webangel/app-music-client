import {Injectable} from '@angular/core';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
	public url: string;


	constructor(
    private _http: HttpClient,
    ){
		this.url = GLOBAL.url;
	}

	getArtists(token: any, page:any):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
    const options =  ({
      headers: headers
    });
		//let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'artists/'+page, options);
		//.map(res => res.json());
	}


	search(token: any, nombre: any):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
    const options =  ({
      headers: headers
    });
		//let options = new RequestOptions({ headers: headers });
		return this._http.get(this.url+'search-artists/'+nombre, options);
		//.map(res => res.json());
	}

	getArtist(token: any, id: string):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
		return this._http.get(this.url+'artist/'+id, options);
		//.map(res => res.json());
	}

	addArtist(token: any, artist: Artist):Observable<any>{
		let params = JSON.stringify(artist);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
		return this._http.post(this.url+'artist', params, {headers: headers})
		//.map(res => res.json());
	}
	editArtist(token: any, id:string, artist: Artist):Observable<any>{
		let params = JSON.stringify(artist);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
		return this._http.put(this.url+'artist/'+id, params, {headers: headers})
		//.map(res => res.json());
	}
	deleteArtist(token: any, id: string):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
		return this._http.delete(this.url+'artist/'+id, options);
		//.map(res => res.json());
	}

}
