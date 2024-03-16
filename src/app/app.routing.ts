import { ModuleWithProviders } from '@angular/core';
//import { Router, RouterModule } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
//impor user
import {UserEditComponent} from './components/user-edit.component';
import {HomeComponent} from './components/home.component';

//import artist
import { ArtistListComponent } from './components/artist-list.component';

import { ArtistAddComponent } from './components/artist-add.component';

import { ArtistEditComponent } from './components/artist-edit.component';

import { ArtistDetailComponent } from './components/artist-detail.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import {SearchListComponent} from './components/search-list/search-list.component';

//import album
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';

//import song
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';

//import error 404
import { ErrorComponent } from './components/error/error.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
const appRoutes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'home', component: HomeComponent},
	{ path: 'artistas/:page', component: ArtistListComponent},
	{ path: 'crear-artista', component: ArtistAddComponent},
	{ path: 'editar-artista/:id', component: ArtistEditComponent},
  { path: 'buscar-artista', component: SearchArtistComponent},
  { path: 'buscar-lista/:name?', component: SearchListComponent},
	{ path: 'artista/:id', component: ArtistDetailComponent},
	{ path: 'crear-album/:artist', component: AlbumAddComponent},
	{ path: 'editar-album/:id', component: AlbumEditComponent},
  { path: 'albums-list/:page', component: AlbumsListComponent},
	{ path: 'album/:id', component: AlbumDetailComponent},
	{ path: 'crear-tema/:album', component: SongAddComponent},
	{ path: 'editar-tema/:id', component: SongEditComponent},
	{ path: 'mis-datos', component: UserEditComponent},
	{ path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
