import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  profile :any
  nik: any
  nama: any
  telp: any
  email: any
  jk: any
  image: any
  constructor(
    public route : Router,
    public http : HttpClient,
    public camera : Camera,
    public gb : GlobalService,
    public acsheet : ActionSheetController
  ) {}

  ionViewDidEnter(){
    this.loadProfile()
  }
  loadProfile(){
    this.profile = JSON.parse(localStorage.getItem("profile"))
    this.nik = this.profile.nik
    this.nama = this.profile.nama
    this.telp = this.profile.telp
    this.email = this.profile.email
    this.jk = this.profile.jk.toString()
    this.image = this.profile.foto
  }
  async Camera(){
    const actionsheet = await this.acsheet.create({
      header: 'Take Picture',
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
            console.log('Camera clicked');
          }
        }, {
          text: 'Gallery',
          icon:'Image',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
            console.log('Gallery clicked');
          }
        },{
          text: 'Cancel',
          icon:'close',
          role:'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionsheet.present();
  }

  pickImage(sourceType){
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log("cek data pic", this.image)
    }, (err) => {
      //handle eror
    });
  }

  update(){
    this.gb.loadingPresent();

    let opt: any
    opt = new HttpHeaders();
    opt.append('Accept', 'application/json');
    opt.append('Content-Type','application/json');

    let frmProfile = new FormData();
    frmProfile.append('nik', this.nik)
    frmProfile.append('nama', this.nama);
    frmProfile.append('telp', this.telp);
    frmProfile.append('email', this.email);
    frmProfile.append('jk', this.jk);
    frmProfile.append('image', this.image);

    this.http.post(this.gb.server+"updateprofile", frmProfile, opt)
    .subscribe((res : any) => {

      this.gb.loadingDismiss()
      console.log(res)
      if(res.status==1){
        this.gb.pesan(res.mess,"success")
        //simpan ke storage
        localStorage.setItem("profile",JSON.stringify(res.data))
      }else{
        this.gb.pesan(res.mess,"danger")
      }
    }
    ,(err:any) => {
      this.gb.loadingDismiss()
      this.gb.pesan("Terjadi Kesalahan","danger")
      console.log(err)
    }
    );
  }

  logout(){
    localStorage.clear()
    this.route.navigateByUrl("/")
  }
}
