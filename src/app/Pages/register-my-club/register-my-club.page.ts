import { Club } from './../../Class/club';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from 'src/app/Class/user';


@Component({
  selector: 'app-register-my-club',
  templateUrl: './register-my-club.page.html',
  styleUrls: ['./register-my-club.page.scss'],
})
export class RegisterMyClubPage implements OnInit {

  formAdmin : FormGroup;
  formClub : FormGroup;
  provincias : String[];
  hide : Boolean;
  nameIcon : String;
  emailRegistrado: String;

  emails : any;

  repetido = false;

  mostrar1 = true;
  mostrar2 = true;
  mostrar3 = true;
  mostrar4 = true;




  constructor(private comunicacion : ComunicacionService, private router : Router, private alertController: AlertController, private toastController: ToastController) {
    this.formAdmin = new FormGroup ({
      email : new FormControl('',[Validators.required, Validators.email, Validators.minLength(2)]),
      pass : new FormControl('',[Validators.required, Validators.minLength(6)]),
      nombre : new FormControl('',[Validators.required, Validators.minLength(1)]),
      apellidos : new FormControl('',[Validators.required, Validators.minLength(1)]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{9}")]),
      provincia : new FormControl('',[Validators.required, Validators.minLength(1)])


    });

    this.formClub = new FormGroup ({
      nombre : new FormControl('',[Validators.required, Validators.minLength(2)]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{9}")]),
      direccion : new FormControl('',[Validators.required, Validators.minLength(6)]),
      municipio : new FormControl('',[Validators.required,  Validators.minLength(0)]),
      provincia : new FormControl('',[Validators.required, Validators.minLength(1)]),
      administrador : new FormControl(this.emailRegistrado,[Validators.required, Validators.email, Validators.minLength(2)]),
      numPistas : new FormControl('',[Validators.required,  Validators.minLength(1)]),
      horaEntrada : new FormControl('',[Validators.required, Validators.minLength(2)]),
      horaSalida : new FormControl('',[Validators.required,  Validators.minLength(2)])
      //imagen : new FormControl('',[Validators.required, Validators.minLength(1)]),



    });


    // Array con todas las provincias ESPA??OLAS
    this.provincias = ['??lava','Albacete','Alicante','Almer??a','Asturias','??vila','Badajoz','Barcelona','Burgos','C??ceres',
    'C??diz','Cantabria','Castell??n','Ciudad Real','C??rdoba','La Coru??a','Cuenca','Gerona','Granada','Guadalajara',
    'Guip??zcoa','Huelva','Huesca','Islas Baleares','Ja??n','Le??n','L??rida','Lugo','Madrid','M??laga','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
    //Fin Array provincias[]


    this.hide = true;
    this.nameIcon  = 'eye';
   }

  ngOnInit() {
  }


  eventoBtnVer(){ //M??todo para cambiar el estado del bot??n verContrase??a
    this.hide = !this.hide;

    if(this.hide){
      this.nameIcon  = 'eye';
    } else {
      this.nameIcon  = 'eye-off';
    }
  } //Fin eventoBtnVer()


public registro(email: string, pwd : string, pwd1 : string){ // M??todo para el bot??n de Registro


  this.comunicacion.obtenerEmail().subscribe(data => {
    this.emails = data;


     for(var i = 0; i <= this.emails.length -1; i++){
       console.log(this.emails[i]);

       if(this.emails[i].email == email){
         this.repetido = true;
         break;
       }

       this.repetido = false;

     }

     if(this.repetido){
      this.presentAlertErrorEmailRepetido();
      } else {

        this.emailRegistrado = email;

    if(this.formAdmin.controls.email.valid){

      if(this.formAdmin.controls.pass.valid){

        if(pwd == pwd1){

          if(this.formAdmin.controls.nombre.valid){

            if(this.formAdmin.controls.apellidos.valid){

              if(this.formAdmin.controls.telefono.valid){

                if(this.formAdmin.controls.provincia.valid){

                  if(this.formClub.controls.nombre.valid){

                    if(this.formClub.controls.telefono.valid){

                      if(this.formClub.controls.direccion.valid){

                        if(this.formClub.controls.municipio.valid){

                        if(this.formClub.controls.provincia.valid){

                          if(this.formClub.controls.administrador.valid){

                           if(this.formClub.controls.numPistas.valid){

                            if(this.formClub.controls.horaEntrada.valid){

                              if(this.formClub.controls.horaSalida.valid){



                                this.comunicacion.registerAdmin(this.formAdmin.value).subscribe((user: User) => {


                                });

                                this.comunicacion.registerMyClub(this.formClub.value).subscribe((club: Club) => {





                                });

                                this.presentAlertExito();
                                  this.router.navigate(['/home']);



                              } else{
                                this.presentAlertErrorHorario();
                              }
                            } else {
                              this.presentAlertErrorHorario();
                            }
                           } else {

                            this.presentAlertErrorPistas();

                           }
                          }

                        } else {
                          this.presentAlertErrorProvincia();
                        }
                      }else {
                        this.presentAlertErrorMunicipio();
                      }
                      } else {
                        this.presentAlertErrorDireccionClub();
                      }

                    } else {
                      this.presentAlertErrorTlf();
                    }
                  } else {
                    this.presentAlertErrorNombreClub();
                  }

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
          console.log(pwd + "?" + pwd1);
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

    this.emailRegistrado = email;

    if(this.formAdmin.controls.email.valid){

      if(this.formAdmin.controls.pass.valid){

        if(pwd == pwd1){

          if(this.formAdmin.controls.nombre.valid){

            if(this.formAdmin.controls.apellidos.valid){

              if(this.formAdmin.controls.telefono.valid){

                if(this.formAdmin.controls.provincia.valid){

                  if(this.formClub.controls.nombre.valid){

                    if(this.formClub.controls.telefono.valid){

                      if(this.formClub.controls.direccion.valid){

                        if(this.formClub.controls.municipio.valid){

                        if(this.formClub.controls.provincia.valid){

                          if(this.formClub.controls.administrador.valid){

                           if(this.formClub.controls.numPistas.valid){

                            if(this.formClub.controls.horaEntrada.valid){

                              if(this.formClub.controls.horaSalida.valid){



                                this.comunicacion.registerAdmin(this.formAdmin.value).subscribe((user: User) => {


                                });

                                this.comunicacion.registerMyClub(this.formClub.value).subscribe((club: Club) => {





                                });

                                this.presentAlertExito();
                                  this.router.navigate(['/home']);



                              } else{
                                this.presentAlertErrorHorario();
                              }
                            } else {
                              this.presentAlertErrorHorario();
                            }
                           } else {

                            this.presentAlertErrorPistas();

                           }
                          }

                        } else {
                          this.presentAlertErrorProvincia();
                        }
                      }else {
                        this.presentAlertErrorMunicipio();
                      }
                      } else {
                        this.presentAlertErrorDireccionClub();
                      }

                    } else {
                      this.presentAlertErrorTlf();
                    }
                  } else {
                    this.presentAlertErrorNombreClub();
                  }

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
          console.log(pwd + "?" + pwd1);
        }

      } else {
        this.presentAlertErrorPass1();
      }

    } else {
      this.presentAlertErrorEmail();
    }
  });
}

cambioMostrar1(){
  this.mostrar1 = !this.mostrar1;
}

cambioMostrar2(){
  this.mostrar2 = !this.mostrar2;
}

cambioMostrar3(){
  this.mostrar3 = !this.mostrar3;
}

cambioMostrar4(){
  this.mostrar4 = !this.mostrar4;
}

async presentAlertErrorEmail() { // ALERTA A MOSTRAR CUANDO EMAIL EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo email no v??lido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorNombreClub() { // ALERTA A MOSTRAR CUANDO NOMBRE DEL CLUB EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo nombre de club no v??lido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorDireccionClub() { // ALERTA A MOSTRAR CUANDO DIRECCI??N DEL CLUB EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo direcci??n de club no v??lido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorPass() { // ALERTA A MOSTRAR CUANDO CONTRASE??AS NO COINCIDEN
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Constrase??as no coinciden',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorPass1() { // ALERTA A MOSTRAR CUANDO CONTRASE??AS EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'La contrase??a debe de ser m??nimo de 6 caracteres',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorTlf() { // ALERTA A MOSTRAR CUANDO EL CAMPO TEL??FONO EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo de tel??fono no v??lido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorProvincia() { // ALERTA A MOSTRAR CUANDO EL CAMPO PROVINCIA EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo de provincia no v??lido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorNombreApellido() { // ALERTA A MOSTRAR CUANDO EL CAMPO NOMBRE O PROVINCIA EST?? MAL RELLENADO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo de Nombre/Apellidos no v??lido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertExito() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Bienvenido',
    subHeader: 'Administrador registrado correctamente',
    message: 'Introduce tus datos para acceder a ReservedP??del y a disfrutar de este bonito deporte.',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorPistas() { // ALERTA A MOSTRAR CUANDO EL CAMPO NUM PISTAS  NO EST?? RELLENO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'N??mero de pistas no indicado.',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorHorario() { // ALERTA A MOSTRAR CUANDO EL CAMPO DE HORAS NO EST?? RELLENO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo horario no establecido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Pulsa de nuevo para confirmar el registro.',
    duration: 2000
  });
  toast.present();
}


async presentAlertErrorEmailRepetido() { // ALERTA A MOSTRAR CUANDO EMAIL EST?? REPETIDO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Este email ya est?? registrado',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertErrorMunicipio() { // ALERTA A MOSTRAR CUANDO NO HAY NADA EN MUNICIPIO
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Error',
    subHeader: 'Campo municipio no establecido',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}


}
