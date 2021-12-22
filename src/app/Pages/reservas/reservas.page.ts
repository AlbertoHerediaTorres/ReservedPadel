import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  nombre : String;
  numPistas : number;
  idClub : Number;
  numeros : Number;
  numero = 1;
  cont = 1;
  arrayNum = ['1'];
  telefono : String;
  direccion : String;
  municipio : String;
  provincia : String;
  horaEntrada : String;
  horaSalida : String;



  constructor(private data : DataService, private comuniacion : ComunicacionService, private router : Router) {



  }

  ngOnInit() {


    //OBTENEMOS TODOS LOS DATOS DEL CLUB
    this.nombre = this.data.getNombre();
    this.numPistas = this.data.getNumPistas();
    this.idClub = this.data.getidClub();
    this.telefono = this.data.getTelefono();
    this.direccion = this.data.getDireccion();
    this.municipio = this.data.getMunicipio();
    this.provincia = this.data.getProvincia();
    this.horaEntrada = this.data.getHoraEntrada();
    this.horaSalida = this.data.getHoraSalida();

    this.numeros = this.numPistas;

    while(this.cont != this.numeros){
      this.cont++;
      this.arrayNum.push(this.cont.toString());

      if(this.cont == 20){
        break;
      }
    }
  }

  verHoras(i : Number){ // Método para ver el horario de la pista X

    this.data.setNumPistaElegida(i);
    this.router.navigate(['/horas']);

  }



}
