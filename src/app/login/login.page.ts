import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : any
  password : any
  constructor(
    public Http : HttpClient,
    public route : Router,
    public gb : GlobalService
  ) { 
    
  }

  ionViewDidEnter(){
    if(localStorage.getItem("profile")){
      this.route.navigate(['/tabs/tab1'])
    }
  }

  ngOnInit() {
  }

  async login(){

    this.gb.loadingPresent();

    let opt: any
    opt = new HttpHeaders();
    opt.append('Accept','application/json');
    opt.append('Content-type','application/json');

    let frmLogin = new FormData();
    frmLogin.append('email', this.email);
    frmLogin.append('password', this.password);

    this.Http.post(this.gb.server+"login",frmLogin, opt)
    .subscribe((res : any) => {

      this.gb.loadingDismiss()

      if(res.status==1){
        this.gb.pesan(res.mess,"success")
        localStorage.setItem("profile",JSON.stringify(res.data))
        this.route.navigateByUrl("tabs/tab1")
      }else{
        this.gb.pesan(res.mess,"danger")
      }
      console.log(res);
    });

    console.log(this.email+" "+this.password)
  }
}
