import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/Class/registro';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-list-jugadores',
  templateUrl: './list-jugadores.page.html',
  styleUrls: ['./list-jugadores.page.scss'],
})
export class ListJugadoresPage implements OnInit {


  idClub: number;

  registros : Registro[];

  constructor(private data : DataService, private comunicacion : ComunicacionService, private alertCtrl : AlertController) { }

  ngOnInit() {

    this.idClub = this.data.getidClub(); // Obtenemos el ID del club

    this.comunicacion.obtenerRegistros(this.idClub).subscribe((registro: Registro[]) => { // Obtenemos todos los usuarios registrados en el club
      this.registros = registro;

      console.log("OBTENEMO TOOOOOOOOOODOS LOS DATOS", this.registros);
    },error => {
      console.log("Error",error);
    });
  }

  eliminar(i : number){ // Método para eliminar a un usuario del club

this.presentAlertConfirm(i);

  }

  async presentAlertConfirm(i : number) { // Ventana de alerta con botón para confirmar si eliminamos al usuario o no
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Deseas eliminar a este usuario?' ,
      message: 'Pulsa en ELIMINAR para borrar a este usuario de tu club.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Confirm Okay');

            this.comunicacion.eliminarRegistro(this.registros[i]).subscribe((registro: Registro) => { // Si aceptamos la eliminación lo borramos completamente


              this.registros.splice(i,1);

              console.log("INSCRIPCION BORRADA");


               },error => {
                 console.log("Error",error);
               });


          }
        }
      ]
    });

    await alert.present();
  }

}
