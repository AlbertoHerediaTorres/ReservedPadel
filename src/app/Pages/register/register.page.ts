import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Class/user';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form : FormGroup;
  provincias : String[];
  hide : Boolean;
  nameIcon : String;

  emails : any;

  repetido = false;

  constructor(private comunicacion : ComunicacionService, private router : Router, private alertController: AlertController, private modalController : ModalController) {

    this.form = new FormGroup ({
      email : new FormControl('',[Validators.required, Validators.email, Validators.minLength(2)]),
      pass : new FormControl('',[Validators.required, Validators.minLength(6)]),
      nombre : new FormControl('',[Validators.required, Validators.minLength(1)]),
      apellidos : new FormControl('',[Validators.required, Validators.minLength(1)]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{9}")]),
      provincia : new FormControl('',[Validators.required, Validators.minLength(1)])

    });


    // Array con todas las provincias ESPAÑOLAS
    this.provincias = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
    //Fin Array provincias[]


    this.hide = true;
    this.nameIcon  = 'eye';
  }

  ngOnInit() {

  }

  eventoBtnVer(){ //Método para cambiar el estado del botón verContraseña
    this.hide = !this.hide;

    if(this.hide){
      this.nameIcon  = 'eye';
    } else {
      this.nameIcon  = 'eye-off';
    }
  } //Fin eventoBtnVer()

  public registro(emailEscrito : string, pwd : string, pwd1 : string) { // Método para el botón de Registro

    this.comunicacion.obtenerEmail().subscribe(data => {
      this.emails = data;


       for(var i = 0; i <= this.emails.length -1; i++){
         console.log(this.emails[i]);

         if(this.emails[i].email == emailEscrito){
           this.repetido = true;
           break;
         }

         this.repetido = false;

       }

       if(this.repetido){
        this.presentAlertErrorEmailRepetido();
        } else {

          if(this.form.controls.email.valid){

            if(this.form.controls.pass.valid){

              if(pwd == pwd1){

                if(this.form.controls.nombre.valid){

                  if(this.form.controls.apellidos.valid){

                    if(this.form.controls.telefono.valid){

                      if(this.form.controls.provincia.valid){

                        this.comunicacion.registerUser(this.form.value).subscribe((user: User) => {

                          this.router.navigate(['/home']);
                          this.presentAlertExito();

                          this.modalController.dismiss();


                        });

                      } else {
                        this.presentAlertErrorProvincia();
                      }

                    } else {
                      this.presentAlertErrorTlf();
                    }
                  } else {
                    this.presentAlertErrorNombreApellido();
                  }

                } else {
                  this.presentAlertErrorNombreApellido();
                }
              } else {
                this.presentAlertErrorPass();
              }

            } else {
              this.presentAlertErrorPass1();
            }

          } else {
            this.presentAlertErrorEmail();
          }

        }

    },error => {
      console.log("Error",error);

      if(this.form.controls.email.valid){

        if(this.form.controls.pass.valid){

          if(pwd == pwd1){

            if(this.form.controls.nombre.valid){

              if(this.form.controls.apellidos.valid){

                if(this.form.controls.telefono.valid){

                  if(this.form.controls.provincia.valid){

                    this.comunicacion.registerUser(this.form.value).subscribe((user: User) => {

                      this.router.navigate(['/home']);
                      this.presentAlertExito();

                      this.modalController.dismiss();


                    });

                  } else {
                    this.presentAlertErrorProvincia();
                  }

                } else {
                  this.presentAlertErrorTlf();
                }
              } else {
                this.presentAlertErrorNombreApellido();
              }

            } else {
              this.presentAlertErrorNombreApellido();
            }
          } else {
            this.presentAlertErrorPass();
          }

        } else {
          this.presentAlertErrorPass1();
        }

      } else {
        this.presentAlertErrorEmail();
      }
    });



  }




  async presentAlertErrorEmail() { // ALERTA A MOSTRAR CUANDO EMAIL ESTÁ MAL RELLENADO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Campo email no válido',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertErrorPass() { // ALERTA A MOSTRAR CUANDO CONTRASEÑAS NO COINCIDEN
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Constraseñas no coinciden',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertErrorPass1() { // ALERTA A MOSTRAR CUANDO CONTRASEÑAS ESTÁ MAL RELLENADO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'La contraseña debe de ser mínimo de 6 caracteres',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertErrorTlf() { // ALERTA A MOSTRAR CUANDO EL CAMPO TELÉFONO ESTÁ MAL RELLENADO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Campo de teléfono no válido',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertErrorProvincia() { // ALERTA A MOSTRAR CUANDO EL CAMPO PROVINCIA ESTÁ MAL RELLENADO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Campo de provincia no válido',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertErrorNombreApellido() { // ALERTA A MOSTRAR CUANDO EL CAMPO NOMBRE O PROVINCIA ESTÁ MAL RELLENADO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Campo de Nombre/Apellidos no válido',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertExito() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bienvenido',
      subHeader: 'Usuario registrado correctamente',
      message: 'Introduce tus datos para acceder a ReservedPádel y a disfrutar de este bonito deporte.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentAlertErrorEmailRepetido() { // ALERTA A MOSTRAR CUANDO EMAIL ESTÁ REPETIDO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Este email ya está registrado',
      message: '',
      buttons: ['OK']
    });

    await alert.present();
  }



}
