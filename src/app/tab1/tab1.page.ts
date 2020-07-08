import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  encodeData: any;
  today = Date.now();
  scannedData: {  };
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(
    private barcodescanner: BarcodeScanner,
    public http:HttpClient,
    public route:Router,
    public gb:GlobalService
  ) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }
  scanCode(){
    this.barcodescanner.scan().then(barcodeData => {
      let user = JSON.parse(localStorage.getItem("profile"))
      let absen = {
        qrcode: barcodeData.text,
        id: user.id,
        nik: user.nik,
        email: user.email,
        waktu: this.today
      }
      let opt : any
      opt = new HttpHeaders();
      opt.append('Accept','application/json');
      opt.append('Content-Type','application/json');


    this.http.post(this.gb.server+"qrcode", absen, opt).subscribe((res:any)=>{

    this.gb.loadingDismiss()

      if(res.status==1){

        this.gb.pesan(res.mess,"success")
        // Simpan ke dalam local storage
        // Pergi ke halaman home
        this.route.navigateByUrl("tabs/tab1")
      }else{
        this.gb.pesan(res.mess,"danger")
      }
      //console.log(res);
    });

    console.log(absen);
    })
    .catch(err=>{
      console.log("Error",err);
    });
  }
  
}
