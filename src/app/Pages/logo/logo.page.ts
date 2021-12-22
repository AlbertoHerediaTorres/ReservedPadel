
import { DataService } from './../../Services/data.service';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/Class/user';
import { Club } from 'src/app/Class/club';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.page.html',
  styleUrls: ['./logo.page.scss'],
})
export class LogoPage implements OnInit {

  esAdmin : String;
  hide : Boolean;
  emailLogueado : String;
  idUser : number;
  provincia : String;
  nombre : String;
  apelldios: String;
  telefono : String;

  clubs : Club[];
  club: Club;


  idClubsRegitrados : String[];


  constructor(private menu : MenuController,  private router : Router, private navCtrl: NavController, private activateRoute : ActivatedRoute, private menuCtrl: MenuController, private comunicacion : ComunicacionService, private data: DataService, private alertController : AlertController) {



  }

  ngOnInit() {
    this.hide = false;

     this.emailLogueado = this.data.getEmail(); //Obtenemos el email que se ha logueado

     console.log("El email logueado es", this.emailLogueado);

    this.comunicacion.obtenerDatos(this.emailLogueado).subscribe((user: User) => { // Comprobamos los datos del usuario pasando el email que se ha logueado
      console.log(user[0]);
      this.idUser = user[0][0];

      this.nombre = user[0][3];
      this.apelldios = user[0][4];
      this.telefono = user[0][5];

      console.log("EL ID DEL USUARIO ES", this.idUser);

      this.provincia = user[0][6];

      this.esAdmin = user[0][7];

      this.data.setEsAdmin(this.esAdmin);

      this.comunicacion.obtenerMisRegistros(this.idUser).subscribe((club: Club[]) => { // Obtenemos los clubs que está registrado el usuario

        this.clubs = club;

        console.log(this.clubs);

      },error => {
        console.log("Error",error);
        this.presentAlert();

      });


    },error => {
      console.log("Error",error);
    });


    console.log(this.clubs);


  }

  ionViewWillEnter() { // Mostramos el MenuController
    this.menuCtrl.enable(true);
    this.menuCtrl.getMenus();
   }

   registrarmeEnClub(){ //Método para enviarnos a la ventana siguiente donde podemos buscar los clubs

    this.data.setProvincia(this.provincia); //ENVIAMOS VARIOS DATOS AL SERVICIO PARA REALIZAR LA BÚSQUEDA POR PROVINCIA
    this.data.setIdUsuario(this.idUser);
    this.data.setNombre(this.nombre);
    this.data.setApellidos(this.apelldios);
    this.data.setTelefono(this.telefono);
    console.log("La provincia es", this.provincia);
    this.router.navigate(['/register-club']);



   }

   verReservas(i : number){ //Método que se activa al pulsar sobre un club ya registrado

    console.log("Has pulsado el club index", i);

    this.club = this.clubs[i];

     this.data.setIdClub(this.club.idClub);
     this.data.setNumPistas(this.club.numPistas);
     this.data.setNombre(this.club.nombre);
     this.data.setTelefono(this.club.telefono);
     this.data.setDireccion(this.club.direccion);
     this.data.setMunicipio(this.club.municipio);
     this.data.setProvincia(this.club.provincia);
     this.data.setHoraEntrada(this.club.horaEntrada);
     this.data.setHoraSalida(this.club.horaSalida);
     this.data.setIdUsuario(this.idUser);

     this.router.navigate(['/reservas']);


   }

   async presentAlert() { //Primera alerta cuando no estamos en ningún club registrado
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¡Hola!',
      subHeader: 'No estás en ningún club',
      message: '¡Pulsa en el botón de añadir club ( + ) para inscribirte en tus clubs favoritos!.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
