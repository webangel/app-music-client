import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Album } from '../models/album';

@Injectable()
export class AlbumService{
	public url: string;


	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getAlbumsAll(token: any, page:any):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
			return this._http.get(this.url+'albums-list/'+page, options);
	}
  getAlbums(token: any, id:any):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
			return this._http.get(this.url+'albums/'+id, options);
	}

	getAlbum(token: any, id: string):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
		return this._http.get(this.url+'album/'+id, options);
		//.map(res => res.json());
	}

	addAlbum(token: any, album: Album):Observable<any>{
		let params = JSON.stringify(album);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
		return this._http.post(this.url+'album', params, {headers: headers});
		//.map(res => res.json());
	}
	editAlbum(token: any, id: string, album: Album):Observable<any>{
		let params = JSON.stringify(album);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
		return this._http.put(this.url+'album/'+id, params, {headers: headers})
		//.map(res => res.json());
	}
	deleteAlbum(token: any, id: string):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
		return this._http.delete(this.url+'album/'+id, options);
		//.map(res => res.json());
	}

}
