import { Component, Input, OnInit } from '@angular/core';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  @Input() public busqueda:any;
  @Input() public nombre:any;
  public identity:any;
  public token:any;
  public url: string;
  constructor(
    private _userService: UserService,
  )
  {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
   // this.busqueda = null;
  }
  ngOnInit(){

  }
  docheck(){
    console.log('Desde search list ', this.busqueda);
  }

}
