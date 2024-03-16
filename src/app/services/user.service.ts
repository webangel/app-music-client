import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {Http, Response, Headers} from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable()
export class UserService{
	public identity: any;
	public token: any;
	public url: string;


	constructor(private _http: HttpClient){
		this.url = GLOBAL.url;
    this.identity = null;
    this.token = null;
	}

	signup(user_to_login:any, gethash:any = null):Observable<any>{
		if(gethash !=null){
			user_to_login.gethash = gethash;
		}

		let json =JSON.stringify(user_to_login);
	  	let params = json;

	  	let headers = new HttpHeaders({'Content-Type':'application/json'});

	  	return this._http.post(this.url+'login', params, {headers: headers});
      //.map(res => res.json());
	}

	register(user_to_register:any):Observable<any>{
		let params = JSON.stringify(user_to_register);
		let headers = new HttpHeaders({'Content-Type':'application/json'});
		//let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'register', params, {headers: headers});
    //.map(res => res.json());
	}

	updateUser(user_to_update:any):Observable<any>{
		let params = JSON.stringify(user_to_update);
		let headers = new HttpHeaders({
			'Content-Type':'application/json',
			'Authorization': this.getToken()
		});

		return this._http.put(this.url+'update-user/'+user_to_update._id,
			params, {headers: headers});
      //.map(res => res.json());

	}

	getIdentity(){
		//let identity = JSON.parse(localStorage.getItem('identity'));
    let identity = localStorage.getItem('identity');
    console.log(identity);

		if(identity !="undefined"){
			this.identity = identity;
		}else{
			this.identity = null;
		}

		return JSON.parse(this.identity);
	}

	getToken(){
		let token = localStorage.getItem('token');

		if(token !="undefined"){
			this.token = token;
			//console.log(this.token);
		}else{
			this.token = null;
			//console.log(this.token);
		}

		return this.token;
	}
}
