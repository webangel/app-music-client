import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../models/album';


@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
  providers: [UserService, AlbumService]
})
export class AlbumsListComponent implements OnInit{


  public albums: Album[];
  public titulo: string;
  public identity:any;
  public token:any;
  public url: string;
  public next_page;
  public prev_page;
  public total;
  public disabledBtn: string;
  public itemsPerPage:any;
  public page : any;
  public dato: any;


 		constructor(

 				private _route: ActivatedRoute,
 				private _router: Router,
 				private _userService: UserService,
 				private _albumService: AlbumService
 			){

        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
 			  this.prev_page = 1;
        this.albums = [];
        this.titulo = "Listado de Discos";
        this.total = 0;
        this.disabledBtn = "";
        this.itemsPerPage;
        this.dato = 0;
      }

      ngOnInit(){
        console.log('artist-detail.component.ts cargado');
        //llamar al metodo del api para sacar un artista de la base de datos y su id getArtist
        this.getAlbums();
        this._route.params.subscribe((params: Params)=>{
            this.page = +params['page'];
        });
        //console.log(this.albums);
      }

      getAlbums(){
       this._route.params.forEach((params: Params)=>{
         let page = +params['page'];
         if(!page){
           page =1;
         }else{
           this.next_page = page+1;
           this.prev_page = page-1;

           if(this.prev_page == 0){
             this.prev_page = 1;
           }
         }

         this._albumService.getAlbumsAll(this.token, page).subscribe(
             response =>{
                if(!response.albums){
                //this.alertMessage='Error en el Servidor';
                this._router.navigate(['/']);
              }else{
                //this.alertMessage='!El artista se ha creado correctamente!';
                this.albums = response.albums;
                this.itemsPerPage = response.itemsPerPage;
                this.total = response.total_items;
                this.dato = this.itemsPerPage * this.page;
                console.log("dato", this.dato);
                if(this.total <= this.dato){
                  this.disabledBtn = "sinclick";
                } else {
                  this.disabledBtn = "";
                }

              }
              },
              error =>{
                var errorMessage = <any>error;
                if(errorMessage != null){
                   var body = JSON.parse(error._body);
                   //this.alertMessage = body.message;

                   console.log(error);
                 }
              }
           );
       });
     }


}
