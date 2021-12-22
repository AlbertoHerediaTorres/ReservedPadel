import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from './../../Services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/Class/club';
import { Observable } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-club',
  templateUrl: './register-club.page.html',
  styleUrls: ['./register-club.page.scss'],
})
export class RegisterClubPage implements OnInit {

  provincias : String[];
  provincia : String;

  clubs : Club[];

  textoBuscar: String;

  valor : String;

  palabra : String;

  constructor(private router : Router, private data: DataService, private comunicacion : ComunicacionService, private navCtrl: NavController, private alertController : AlertController) {

    // Array con todas las provincias ESPAÑOLAS
    this.provincias = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
    'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
    'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
    'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
    'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
  }

  ngOnInit() {

   this.provincia = this.data.getProvincia(); //Obtenemos la provincia del usuario
   console.log("La provincia seleccionada es:", this.provincia);



   this.comunicacion.obtenerClubs(this.provincia).subscribe((club: Club[]) => { //Buscamos los clubs por la provincia del usuario

    this.clubs = club;

    console.log(this.clubs);

    this.data.setClubs(this.clubs);


  },error => {
    console.log("Error",error);
  });



  }



  public buscar(palabra) { //Método para buscar por el shearbar
    console.log("INTENTO DE BÚSQUEDA");
    this.comunicacion.obtenerClubsBuscador(palabra).subscribe(async club => {
      console.log("prueba", club);
      this.clubs = club;
      if (club == null) {

      }

    });
  }

  obtenerNuevoValor(valor : String){ //Método cuando cambiamos la provincia del SELECT

    this.comunicacion.obtenerClubs(valor).subscribe((club: Club[]) => {

      this.clubs = club;

      console.log(this.clubs);

      this.data.setClubs(this.clubs);

    },error => {
      console.log("Error", error);

      this.presentAlert();
    });



  }

  async presentAlert() { //Ventana de alerta si buscamos por alguna provincia que no tenga registrado ningún club
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Lo sentimos',
      subHeader: 'No hemos obtenido ningún club',
      message: 'No tenemos ningún club registrado en esta provincia, disculpe las molestias.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
