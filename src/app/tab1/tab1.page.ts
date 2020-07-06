import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  encodeData: any;
  scannedData: {  };
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(
    private barcodescanner: BarcodeScanner
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
        idkar: user.id_kar
      }
    })
    .catch(err=>{
      console.log("Error",err);
    });
  }
  
}
