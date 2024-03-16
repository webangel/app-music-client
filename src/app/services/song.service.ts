import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {Http, Response, Headers, RequestOptions} from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Song } from '../models/song';

@Injectable()
export class SongService{
	public url: string;


	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
	}

	getSongs(token: any, albumId = null):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });

		if(albumId == null){
			return this._http.get(this.url+'songs', options);
				//.map(res => res.json());
		}else{
			return this._http.get(this.url+'songs/'+albumId, options);
				//.map(res => res.json());
		}
	}


	getSong(token: any, id: string):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
		return this._http.get(this.url+'song/'+id, options);
		//.map(res => res.json());
	}

	addSong(token: any, song: Song):Observable<any>{
		let params = JSON.stringify(song);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
		return this._http.post(this.url+'song', params, {headers: headers});
		//.map(res => res.json());
	}
	editSong(token: any, id: string, song: Song):Observable<any>{
		let params = JSON.stringify(song);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});
		return this._http.put(this.url+'song/'+id, params, {headers: headers});
		//.map(res => res.json());
	}
	deleteSong(token: any, id: string):Observable<any>{
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': token
		});

		const options =  ({
      headers: headers
    });
		return this._http.delete(this.url+'song/'+id, options);
		//.map(res => res.json());
	}

}
