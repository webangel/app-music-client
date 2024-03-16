import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';

 @Component({
 	selector: 'artist-add',
 	templateUrl: '../views/artist-add.html',
 	providers: [UserService, ArtistService]
 })

 export class ArtistAddComponent implements OnInit{
 		public titulo: string;
 		public artist: Artist;
 		public identity;
 		public token;
 		public url: string;
 		public alertMessage:any;
     public is_edit:boolean;

 		constructor(

 				private _route: ActivatedRoute,
 				private _router: Router,
 				private _userService: UserService,
 				private _artistService: ArtistService
 			){

 			this.titulo = 'Crear un nuevo artista';
 			this.identity = this._userService.getIdentity();
 			this.token = this._userService.getToken();
 			this.url = GLOBAL.url;
 			this.artist = new Artist('', '', '', '');
       this.is_edit = false;
       this.filesToUpload = [];
 		}

 		ngOnInit(){
 			console.log('artist-add.component.ts cargado');
 			//alert(this._artistService.addArtist());

 			//Conseguir el listado de los artistas
 		}

 		onSubmit(){
 			console.log(this.artist);
 			this._artistService.addArtist(this.token, this.artist).subscribe(
 					response =>{

 						if(!response.artist){
 							this.alertMessage='Error en el Servidor';
 						}else{
 							this.alertMessage='!El artista se ha creado correctamente!';
 							this.artist = response.artist;
 							this._router.navigate(['/editar-artista', response.artist._id]);
 						}
 					},
 					error =>{
 						var errorMessage = <any>error;
 						if(errorMessage != null){
		  					var body = JSON.parse(error._body);
		  					this.alertMessage = body.message;

		  					console.log(error);
		  				}
 					}
 				);
 		}
     public filesToUpload: Array<File>;
     fileChangeEvent(fileInput: any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
    }
 }
