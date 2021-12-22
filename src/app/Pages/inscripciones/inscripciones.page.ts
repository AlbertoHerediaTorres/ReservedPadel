import { Inscripcion } from './../../Class/inscripcion';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.page.html',
  styleUrls: ['./inscripciones.page.scss'],
})
export class InscripcionesPage implements OnInit {

  idClub: number;

  inscripciones : Inscripcion[];

  constructor(private data : DataService, private comunicacion : ComunicacionService) { }

  ngOnInit() {

    this.idClub = this.data.getidClub(); //Obtenemos el ID del club

    console.log("EL ID DEL CLUB ES", this.idClub);

    this.comunicacion.obtenerInscripciones(this.idClub).subscribe((inscripcion: Inscripcion[]) => { // Obtenemos TODAS las inscripciones del club
      this.inscripciones = inscripcion;

      console.log("OBTENEMO TOOOOOOOOOODOS LOS DATOS", this.inscripciones);
    },error => {
      console.log("Error",error);
    });




  }

  agregar(i : number){ // Si aceptamos al usuario

    this.comunicacion.registrarseEnClubs(this.inscripciones[i]).subscribe((inscripcion: Inscripcion) => { // Registra el usuario al club

     console.log("AGREGADO AL CLUB!!!")


     this.comunicacion.eliminarInscripcion(this.inscripciones[i]).subscribe((inscripcion: Inscripcion) => { // Elimina la suscripción


      this.inscripciones.splice(i,1);
       },error => {
         console.log("Error",error);
       });


      },error => {
        console.log("Error",error);
      });


  }

  eliminar(i : number){ // Si deniega al usuario

    this.comunicacion.eliminarInscripcion(this.inscripciones[i]).subscribe((inscripcion: Inscripcion) => { // Elimina la suscripción


      this.inscripciones.splice(i,1);

      console.log("INSCRIPCION BORRADA");


       },error => {
         console.log("Error",error);
       });

  }
}


