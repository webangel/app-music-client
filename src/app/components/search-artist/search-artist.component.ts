import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
//import { SearchListComponent } from '../search-list/search-list.component';
import { ArtistService } from '../../services/artist.service';
import { Artist } from '../../models/artist';
@Component({
  selector: 'app-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.css'],
  providers: [ArtistService]
})
export class SearchArtistComponent {

  public artist: Artist;
  public identity;
  public token;
  public url: string;
  public alertMessage:any;
  public is_edit:boolean;
  public nombre: string;

 		constructor(

 				private _route: ActivatedRoute,
 				private _router: Router,
 				private _userService: UserService,
 				private _artistService: ArtistService
 			){

 			this.identity = this._userService.getIdentity();
 			this.token = this._userService.getToken();
 			this.url = GLOBAL.url;
 			this.artist = new Artist('', '', '', '');
       this.is_edit = false;
       this.nombre = "";
 		}

    onSubmit(){

      this._artistService.search(this.token, this.nombre).subscribe(
          response =>{

            if(!response.artist){
              this.alertMessage='Error en el Servidor';
            }else{
              this.alertMessage='!El artista se ha creado correctamente!';
              this.artist = response.artist;
              console.log( this.artist);
              //this._router.navigate(['/editar-artista', response.artist._id]);
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
}
