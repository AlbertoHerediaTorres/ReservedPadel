import { Inscripcion } from './../../Class/inscripcion';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from './../../Services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/Class/club';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-club-data',
  templateUrl: './club-data.page.html',
  styleUrls: ['./club-data.page.scss'],
})
export class ClubDataPage implements OnInit {

  club : Club;
  clubs : Club[];

  email : String;
  formInscripcion : FormGroup;

  inscripcion : Inscripcion;

  idUser : any;
  idClub : any;
  nombreUsuario: any;
  apellidosUsuario : any;
  telefonoUsuario : any;
  provinciaUsuario : any;

  registrado = false;

  constructor(private activateRouter : ActivatedRoute, private data : DataService, private comunicacion : ComunicacionService,  private router : Router, private alertController: AlertController) {



   }

  ngOnInit() {

    this.activateRouter.params.subscribe( params => { // Obtenemos el ID del array anterior (array anterior era los clubs) así obtenemos los datos de este
      this.club = this.data.getClub(params['id']);


    });

    this.email = this.data.getEmail();   //Enviamos datos al servicio por si decide inscribirse en el club.
    this.idUser = this.data.getidUsuario();
    this.nombreUsuario = this.data.getNombre();
    this.apellidosUsuario = this.data.getApellidos();
    this.telefonoUsuario = this.data.getTelefono();
    this.provinciaUsuario = this.data.getProvincia();
    this.idClub = this.club.idClub;

    this.formInscripcion = new FormGroup ({
      idUsuario : new FormControl(this.idUser,[Validators.required, Validators.minLength(2)]),
      idClub : new FormControl(this.idClub,[Validators.required, Validators.minLength(2)]),
      nombre : new FormControl(this.nombreUsuario,[Validators.required, Validators.minLength(2)]),
      apellidos : new FormControl(this.apellidosUsuario,[Validators.required, Validators.minLength(2)]),
      telefono : new FormControl(this.telefonoUsuario,[Validators.required, Validators.pattern("[0-9 ]{9}")]),
      provincia : new FormControl(this.provinciaUsuario,[Validators.required, Validators.minLength(1)])


    });



  }

  enviarPeticion(){ // Método para enviar la inscripción al club correspondiente

    this.comunicacion.obtenerMisRegistros(this.idUser).subscribe((club: Club[]) => { // Obtenemos los registros del usuario para que no se registre de nuevo en un club registrado

      this.clubs = club;

      console.log("EEEEEEEEEEEEEEEEEE",this.clubs);

      for(var i = 0; i <= this.clubs.length -1; i++){ //Recorremos los clubs en los que está registrado el usuario
        console.log(this.clubs[i].idClub);

        if(this.clubs[i].idClub == this.idClub){ //Si está registrado en el mismo que está intentando inscribirse
          console.log("YA ESTÁS REGISTRADO EN ESTE CLUB");
          this.registrado = true;
          break;
        }

        this.registrado = false;


      }

      if(this.registrado){ //Mostramos ventana de alerta indicando que ya está registrado

        this.presentAlertRegistrado();

      } else { // En caso contrario...

        this.comunicacion.inscribirseEnClubs(this.formInscripcion.value).subscribe((inscripcion: Inscripcion) => { // Mandamos la inscripción al club correspondiente

          console.log("EXITOOOOOOOOOOOOOOOOOOOOOOOOOOO");

          this.presentAlert();
          this.router.navigate(['/logo']);
          },error => {
            console.log("Error",error);
          });

      }
        console.log("AL PULSAR ESTOS SON LOS DATOS", this.email, this.club.idClub);

    },error => {
      console.log("Error",error); //Si no está registrado EN NINGÚN SOLO CLUB.

      this.comunicacion.inscribirseEnClubs(this.formInscripcion.value).subscribe((inscripcion: Inscripcion) => { // Mandamos la inscripción al club correspondiente

        console.log("EXITOOOOOOOOOOOOOOOOOOOOOOOOOOO");

        this.presentAlert();
        this.router.navigate(['/logo']);
        },error => {
          console.log("Error",error);
        });
    });

  }

  async presentAlert() { //Ventana de alerta indicando que su inscripción ha sido enviada
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Inscripción enviada',
      subHeader: 'Su inscripción ha sido enviada al club',
      message: 'Por favor, espere a que el administrador del club te acepte.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertRegistrado() { // Ventana de alerta indicando que ya está registrado en el club
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Otra vez?',
      subHeader: 'Ya eres jugador de este club',
      message: 'No puedes inscribirte a un club que ya estás inscrito.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
