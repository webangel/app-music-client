import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { HomeComponent } from './components/home.component';
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';
import { PlayerComponent } from './components/player.component';
import { ErrorComponent } from './components/error/error.component';
import { SearchArtistComponent } from './components/search-artist/search-artist.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    ArtistListComponent,
    ArtistDetailComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent,
    PlayerComponent,
    ErrorComponent,
    SearchArtistComponent,
    SearchListComponent,
    AlbumsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
