import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';

 @Component({
 	selector: 'artist-detail',
 	templateUrl: '../views/album-detail.html',
 	providers: [UserService, AlbumService, SongService]
 })

 export class AlbumDetailComponent implements OnInit{
 		public titulo: string;
 		public songs: Song[];
 		public album: Album;
 		public identity:any;
 		public token:any;
 		public url: string;
 		public alertMessage:any;
    public document:any;
 		constructor(

 				private _route: ActivatedRoute,
 				private _router: Router,
 				private _userService: UserService,
 				private _albumService: AlbumService,
 				private _songService: SongService,
        @Inject(DOCUMENT) document: Document
 			){

 			this.identity = this._userService.getIdentity();
 			this.token = this._userService.getToken();
 			this.url = GLOBAL.url;
      this.titulo = '';
      //this.songs = new Song(1,'', '', '', '');
      this.songs = [];
      this.album = new Album('','', '', 2022, '', '');

      this.document = document;
 		}

 		ngOnInit(){
 			console.log('album-detail.component.ts cargado');
 			//Sacar album de la BD
 			this.getAlbum();
 		}

 		getAlbum(){
 			console.log('el metodo funciona');
 			this._route.params.forEach((params: Params) =>{
 				let id = params['id'];

 				this._albumService.getAlbum(this.token, id).subscribe(
 						response =>{
 							if(!response.album){
 							//this.alertMessage='Error en el Servidor';
 							this._router.navigate(['/']);
 							}else{
 							//this.alertMessage='!El artista se ha creado correctamente!';
 							this.album = response.album;


	 							//sacar los albunes del artista
	 							this._songService.getSongs(this.token, response.album._id).subscribe(
	 								response => {
	 									if(!response.songs){
	 										this.alertMessage ='Este album no tiene canciones';
	 									}else{
	 										this.songs = response.songs;
	 									}
	 								},
	 								error =>{
			 							var errorMessage = <any>error;
				 						if(errorMessage != null){
						  					var body = JSON.parse(error._body);
						  					console.log(error);
						  				}
			 						}
	 							);
 							}
 						},
 						error =>{
 							var errorMessage = <any>error;
	 						if(errorMessage != null){
			  					var body = JSON.parse(error._body);
			  					console.log(error);
			  				}
 						}
 					);
 			});
 		}

 		public confirmado:any;
		onDeleteConfirm(id:any){
			this.confirmado = id;
		}

		onDeleteSong(id:any){
			this._songService.deleteSong(this.token, id).subscribe(
					response =>{
						if(!response.song){
 							alert('Error en el servidor');
 						}else{
 							this.getAlbum();
 						}


					},
					error =>{
						var errorMessage = <any>error;
 						if(errorMessage != null){
		  					var body = JSON.parse(error._body);
		  					console.log(error);
		  				}
					}
				);
		}

		onCancelSong(){
			this.confirmado = null;
		}

		startPlayer(song: any){
			let song_player = JSON.stringify(song);
			let file_path = this.url + "get-file-song/" + song.file;
			let image_path = this.url + "get-image-album/" + song.album.image;

			localStorage.setItem("sound_song", song_player);

			this.document.getElementById("mp3-source").setAttribute("src", file_path);
			(document.getElementById("player") as any).load();
			(document.getElementById("player") as any).play();

			this.document.getElementById("play-song-title").innerHTML = song.name;
			this.document.getElementById("play-song-artist").innerHTML = song.album.artist.name;
			this.document.getElementById("play-image-album").setAttribute('src', image_path);
		}

 }
