import { DataService } from './../../Services/data.service';
import { ComunicacionService } from './../../Services/comunicacion.service';
import { RegisterPage } from './../register/register.page';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';
import { User } from 'src/app/Class/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  form : FormGroup;

  anio : number; // Variable de año

  hide : Boolean;
  nameIcon : String;

  logueoInCorrecto : Boolean;
  acceso : Boolean




  constructor(private formBuilder: FormBuilder, private modalController : ModalController, private navCtrl : NavController, private comunicacion : ComunicacionService, private router : Router, private alertController: AlertController, private menuCtrl: MenuController, private data: DataService, private platform: Platform) {

    this.form = this.formBuilder.group ({
      email: ['albertoherediatorres95@gmail.com', [Validators.required, Validators.email]],
      pass: ['123456', Validators.required],
    });


    this.anio = new Date().getFullYear(); //A la variable año le damos el valor del año actual

    this.hide = true;
    this.nameIcon  = 'eye';


    this.logueoInCorrecto = false
  }

  ionViewWillEnter() { // Para hacer desaparecer el MenuController (MENÚ LATERAL)
    this.menuCtrl.enable(false);
   }





  async modalPresent(){ //Presentación ventanaModal
    const modal = await this.modalController.create({
      component : RegisterPage
    });
    return await modal.present();
  } //Fin ventanaModal


  eventoBtnVer(){ //Método para cambiar el estado del botón verContraseña
    this.hide = !this.hide;

    if(this.hide){
      this.nameIcon  = 'eye';
    } else {
      this.nameIcon  = 'eye-off';
    }
  } //Fin eventoBtnVer()


  public logueo() { // Método para el botón de Acceso


    this.comunicacion.login(this.form.value).subscribe((user : User) => {
      console.log(user);
      this.data.setEmail(user.email);
      this.acceso = true;


      this.router.navigate(['/logo']); // {queryParams: {user: user.email} });


    },error => {
      this.presentAlert();
    });

  }

  async presentAlert() { // Ventana de alerta cuando el usuario y/o contraseña son mal introducidos
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Usuario / contraseña incorrecto',
      message: 'El usuario o la contraseña que has introducido es incorrecta, por favor, inténtelo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }


  backButtonEvent() { // Al pulsar el botón de atrás te saca de la aplicación.
   if (this.router.url === '/home') {
        navigator['app'].exitApp();
  }

  }
}
