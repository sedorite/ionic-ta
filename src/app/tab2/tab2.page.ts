import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  history : any
  constructor(
    public route : Router,
    public http : HttpClient,
    public gb : GlobalService
  ) {
    this.getHistory();
  }

  getHistory(){
    this.http.get(this.gb.server + "history")
    .subscribe(result => {
      this.history = result;
      console.log(result);
    },
    eror => {
      console.log(eror);
    }
    )
  }
}
