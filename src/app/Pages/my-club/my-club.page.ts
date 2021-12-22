import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/Class/club';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import * as moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-my-club',
  templateUrl: './my-club.page.html',
  styleUrls: ['./my-club.page.scss'],
})
export class MyClubPage implements OnInit {

  esAdmin : String;
  userAdmin : String;
  club : Club;
  administrador = false;
  usuario = false;
  idClub : number;
  nombre : String;
  telefono : String;
  direccion : String;
  municipio : String;
  provincia : String;
  numPistas : number;
  horaEntrada : String;
  horaSalida : String;

  form : FormGroup;

  editable : Boolean;

  provincias : String[];

  foto : String;


  constructor(private data : DataService, private comunicacion : ComunicacionService, private route : Router, private alertController : AlertController, private camera: Camera,  private transfer : FileTransfer, private androidPermissions: AndroidPermissions) {

    this.form = new FormGroup ({ //Formulario en el caso de que se modifiquen los datos del club

      idClub : new FormControl('',[Validators.required, Validators.minLength(1)]),
      nombre : new FormControl('',[Validators.required, Validators.minLength(1)]),
      direccion : new FormControl('',[Validators.required, Validators.minLength(1)]),
      telefono : new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{9}")]),
      pistas : new FormControl('',[Validators.required, Validators.minLength(1)]),
      municipio : new FormControl('',[Validators.required, Validators.minLength(1)]),
      provincia : new FormControl('',[Validators.required, Validators.minLength(1)]),
      entrada : new FormControl('',[Validators.required, Validators.minLength(1)]),
      salida : new FormControl('',[Validators.required, Validators.minLength(1)])

    });

        // Array con todas las provincias ESPAÑOLAS
        this.provincias = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
        'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
        'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
        'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
        'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
        //Fin Array provincias[]

    this.editable = true;
   }

  ngOnInit() {
    this.esAdmin = this.data.getEsAdmin(); //Obtenemos si el usuario es ADMINISTRADOR O NO

    if(this.esAdmin == '0'){ //Si NO es usuario le aparecerá una ventana diferente al de admisnitrador
      this.administrador = true;

    } else if(this.esAdmin == '1') { //Al ser admin aparece una ventana totalmente distinta

    this.usuario = true;
    this.userAdmin = this.data.getEmail();

    this.comunicacion.obtenerMyClub(this.userAdmin).subscribe((club: Club) => { // Obtenemos todos los datos del club del administrador
      this.club = club;

      console.log("DATOS OBTENIDOS DEL CLUB", this.club);

      this.idClub = this.club[0][0];
      this.nombre = this.club[0][1];
      this.direccion = this.club[0][2];
      this.telefono = this.club[0][4];
      this.municipio = this.club[0][5];
      this.provincia = this.club[0][6];
      this.numPistas = this.club[0][8];
      this.horaEntrada = this.club[0][9];
      this.horaSalida = this.club[0][10];

      this.data.setNombre(this.nombre);
      this.data.setNumPistas(this.numPistas);
      this.data.setHoraEntrada(this.horaEntrada);
      this.data.setHoraSalida(this.horaSalida);
      this.data.setIdClub(this.idClub);

    },error => {
      console.log("Error",error);
    });

    }



  }

  verInscripciones(){ // Método para ver las inscripciones al club
    this.data.setIdClub(this.idClub);
    console.log("EL ID DE CLUB QUE ENVIO ES:", this.idClub);
    this.route.navigate(['/inscripciones']);
  }

  verRegistros(){ // Método para ver los jugadores inscritos en el club
    this.data.setIdClub(this.idClub);
    console.log("EL ID DE CLUB QUE ENVIO ES:", this.idClub);
    this.route.navigate(['/list-jugadores']);
  }

  verPistas(){ // Método para gestionar las pistas
    this.data.setIdClub(this.idClub);
    console.log("EL ID DE CLUB QUE ENVIO ES:", this.idClub);
    this.route.navigate(['/mis-pistas']);
  }

  editarDatos(){ // Método para mostrar/ocultar la tarjeta de editar datos

    this.editable = !this.editable;
  }

  guardarDatos(){ // Guarda los datos del formulario

    this.form.controls.idClub.setValue(this.idClub);

  if(this.form.controls.idClub.valid){

    if(this.form.controls.nombre.valid){

      if(this.form.controls.direccion.valid){

        if(this.form.controls.telefono.valid){

          if(this.form.controls.pistas.valid){

            if(this.form.controls.municipio.valid){

              if(this.form.controls.provincia.valid){

                if(this.form.controls.entrada.valid){

                  if(this.form.controls.salida.valid){

                    this.comunicacion.editarDatosClub(this.form.value).subscribe((club: Club) => { // ACTUALIZA los datos del club

                      this.presentExitoEditar()
                      this.editable = !this.editable;

                      console.log("TODO VALIDOOOOOOOOOOOOOOOOOOOOOOOOOOOO");

                      this.comunicacion.obtenerMyClub(this.userAdmin).subscribe((club: Club) => { //Al cambiar los datos vuelve a obtener los datos del club
                        this.club = club;

                        console.log("DATOS OBTENIDOS DEL CLUB", this.club);

                        this.idClub = this.club[0][0];
                        this.nombre = this.club[0][1];
                        this.direccion = this.club[0][2];
                        this.telefono = this.club[0][4];
                        this.municipio = this.club[0][5];
                        this.provincia = this.club[0][6];
                        this.numPistas = this.club[0][8];
                        this.horaEntrada = this.club[0][9];
                        this.horaSalida = this.club[0][10];

                      },error => {
                        console.log("Error",error);
                      });



                      });

                  }
                }
              }
            }
            }
          }
    }

    }

  }


}



upload() //Métdo para subir FOTO ******************************************** SIN TERMINAR ********************************************************
{

  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };

  this.camera.getPicture(options).then( imageData => {
    console.log("", imageData);
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.foto = base64Image;
    console.log("dasdasd", this.foto);
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options1: FileUploadOptions = {
     fileKey: 'file',
     fileName: moment()+'.jpg',
     mimeType: 'multipart/form-data',
      httpMethod: 'POST',
      headers: {
        'Accept': 'application/json',
      }

  }

    fileTransfer.upload(imageData, 'https://reservedpadel.000webhostapp.com/subirImg.php', options1)
    .then((data) => {
       // success
       console.log("success", data);
      this.clubImg(this.club.administrador, options1.fileName);
}, (err) => {
     // error
     console.log("error"+JSON.stringify(err));
});


});


}
clubImg(email: string, imagen: string) {
  this.comunicacion.insertImage(email, imagen).subscribe(data => {
    console.log("inserta imagen",data);
  });
}

////////////////////////////////////////////////////////////



async presentExitoEditar() { // ALERTA A MOSTRAR CUANDO CAMBIAMOS CON ÉXITO LOS DATOS
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Campos editados',
    subHeader: 'Los campos se han editado correctamente',
    message: '',
    buttons: ['OK']
  });

  await alert.present();
}

}
