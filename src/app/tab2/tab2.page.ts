import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
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
    let user = JSON.parse(localStorage.getItem("profile"))
    let absen = {id:user.id}
    let opt : any
      opt = new HttpHeaders();
      opt.append('Accept','application/json');
      opt.append('Content-Type','application/json');
    this.http.post(this.gb.server+"history", absen, opt).subscribe((res:any)=>{

      // this.gb.loadingDismiss()
  
        // if(res.status==1){
        this.history = res
        //   this.gb.pesan(res.mess,"success")
        //   // Simpan ke dalam local storage
        //   // Pergi ke halaman home
        //   this.route.navigateByUrl("tabs/tab1")
        // }else{
        //   this.gb.pesan(res.mess,"danger")
        // }
        console.log(res);
      })
  
      // console.log(absen);
      // })
      // .catch(err=>{
      //   console.log("Error",err);
      // });
  }
}
