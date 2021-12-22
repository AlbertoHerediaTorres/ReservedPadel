import { ComunicacionService } from './../../Services/comunicacion.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { User } from 'src/app/Class/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  email : String;
  nombre: String;
  apellidos : String;
  telefono : String;
  form : FormGroup;

  editable : Boolean

  constructor(private router : Router, private navCtrl: NavController, private data: DataService, private comunicacion : ComunicacionService, private alertController : AlertController) {

    this.form = new FormGroup ({ //Formulario por si el usuario quiere cambiar sus datos
      email : new FormControl('',[Validators.required, Validators.minLength(1)]),
      nombre : new FormControl('',[Validators.required, Validators.minLength(1)]),
      apellidos : new FormControl('',[Validators.required, Validators.minLength(1)]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{9}")])
    });

this.editable = true;

  }

  ngOnInit() {

    this.email = this.data.getEmail(); // Obtenemos el email del usuario

    this.comunicacion.obtenerDatos(this.email).subscribe((user: User) => { // Obtenemos todos los datos del usuario
      this.nombre = user[0][3];
      this.apellidos = user[0][4];
      this.telefono = user[0][5];


    },error => {
      console.log("Error",error);
    });

  }


  editarDatos(){ //Método para mostrar la tarjeta para editar los datos

    this.editable = !this.editable;
  }



  guardarDatos(){ //Guarda los datos de la tarjeta comentada anteriormente

      this.form.controls.email.setValue(this.email);

    if(this.form.controls.email.valid){

    if(this.form.controls.nombre.valid){

      if(this.form.controls.apellidos.valid){

        if(this.form.controls.telefono.valid){

          this.comunicacion.editarDatosUsuario(this.form.value).subscribe((user: User) => { //ACTUALIZA los datos del usuario

          this.presentExitoEditar()
          this.editable = !this.editable;

          this.email = this.data.getEmail();

          this.comunicacion.obtenerDatos(this.email).subscribe((user: User) => { // Obtiene los datos del usuario una vez cambiado
            this.nombre = user[0][3];
            this.apellidos = user[0][4];
            this.telefono = user[0][5];


          },error => {
            console.log("Error",error);
          });



          });
        } else{
          this.presentAlertErrorTlf(); // Ventana si el teléfono está mal escrito
        }
      } else {
        this.presentAlertErrorNombreApellido(); // Ventana si el apellido está mal escrito
      }
    } else {
      this.presentAlertErrorNombreApellido(); // Ventana si el nombre está mal escrito
    }
  }

  }

  async presentExitoEditar() { // ALERTA A MOSTRAR CUANDO EMAIL ESTÁ MAL RELLENADO
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Campos editados',
      subHeader: 'Los campos se han editado correctamente',
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
}
