import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album';
import { SongService } from '../services/song.service';
import { Song } from '../models/song';
import { UserService } from '../services/user.service';
// import { GLOBAL } from '../services/global';
// import { UserService } from '../services/user.service';



 @Component({
 	selector: 'home',
 	templateUrl: '../views/home.html',
 	providers:  [UserService, ArtistService, AlbumService, SongService]
 })

 export class HomeComponent implements OnInit{
	public titulo: string;
  public artists: Artist[];
  public albums: Album[];
  public songs: Song[];
	// public identity;
	public token;
	// public url: string;
	// private display:any = 'none';

 		constructor(
 				private _route: ActivatedRoute,
 				private _router: Router,
        private _artistService: ArtistService,
        private _albumService: AlbumService,
        private _songService: SongService,
 				private _userService: UserService
 			){

 			this.titulo = 'Inicio';
      this.artists = [];
      this.albums = [];
      this.songs = [];
 			// this.identity = this._userService.getIdentity();
 			this.token = this._userService.getToken();
 			// this.url = GLOBAL.url;

 			// if(this.identity){
 			// 	this.display = 'block';
 			// }
 		}

 		ngOnInit(){
 			console.log('home.component.ts cargado');
 			this.homeInit();
 			//Conseguir el listado de los artistas
 		}

 		// ngAfterViewInit(){
 		// 	this.homeInit();
 		// }

 		homeInit(){
      this._artistService.getArtists(this.token, null).subscribe(
        response =>{
           if(!response.artists){
            //this.alertMessage='Error en el Servidor';
            this._router.navigate(['/']);
          }else{
            //this.alertMessage='!El artista se ha creado correctamente!';
            this.artists = response.artists;
            console.log("artists: ", this.artists.length);
          }
         },
         error =>{
           var errorMessage = <any>error;
           if(errorMessage != null){
              console.log(error);
            }
         }
      );
      this._albumService.getAlbumsAll(this.token, null).subscribe(
        response =>{
           if(!response.albums){
            //this.alertMessage='Error en el Servidor';
            this._router.navigate(['/']);
          }else{
            //this.alertMessage='!El artista se ha creado correctamente!';
            this.albums = response.albums;
            console.log("albums: ", this.albums.length);
          }
         },
         error =>{
           var errorMessage = <any>error;
           if(errorMessage != null){
              console.log(error);
            }
         }
      );
      this._songService.getSongs(this.token, null).subscribe(
        response =>{
           if(!response.songs){
            //this.alertMessage='Error en el Servidor';
            this._router.navigate(['/']);
          }else{
            //this.alertMessage='!El artista se ha creado correctamente!';
            this.songs = response.songs;
            console.log("songs: ", this.songs.length);
          }
         },
         error =>{
           var errorMessage = <any>error;
           if(errorMessage != null){
              console.log(error);
            }
         }
      );
 		}
 }
