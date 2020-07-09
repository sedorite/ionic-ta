import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public loader : HTMLIonLoadingElement
  isLoading : any
  alamat = "http://dika.sekiver.com"
  image = this.alamat+"/uploads"
  server = this.alamat+"/api/"
  constructor(
    public loading : LoadingController,
    public toas: ToastController
  ) { }

  async loadingPresent(){
    this.isLoading = true;
    return await this.loading.create({
      message: 'Please Wait. . .',
	    spinner: 'circles'
      }).then(a => {
		    a.present().then(() => {
		    console.log('loading presented');
		      if (!this.isLoading){
			    a.dismiss().then(() => console.log('abort loading'));
		    }
	  	});	
	  });
  }

  async loadingDismiss(){
	  this.isLoading = false;
	  return await this.loading.dismiss().then(() => console.log('loading dismissed'));
  }

  public async pesan(mess,warna){
    const toast = await this.toas.create({
      message: mess,
      duration: 2000,
      color: warna
    });
    toast.present();
  }
}
