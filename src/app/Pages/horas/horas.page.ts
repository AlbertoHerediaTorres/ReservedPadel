import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/Services/comunicacion.service';
import { DataService } from 'src/app/Services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reserva } from 'src/app/Class/reserva';

@Component({
  selector: 'app-horas',
  templateUrl: './horas.page.html',
  styleUrls: ['./horas.page.scss'],
})
export class HorasPage implements OnInit {

  numPista : number;
  nombre : String;
  horaEntrada : String;
  horaSalida : String;
  diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  diaActual : String
  diaSiguiente : String
  dd : String;
  mm : String;
  yy : String
  horaNumEn : number;
  minutoNumEn : number;
  horaNumSal : number;
  minutoNumSal : number;
  arrayHoraTotal = [];
  fechaCompleta : String;
  fechaDate : Date;
  arrayFechasTotal = [];



  form : FormGroup;


  idUser : any;
  idClub : any;
  pista: any;
  horaEnt : any;
  horaIntermedia : any;
  horaSal : any;
  fecha : any;

  reservas : Reserva[];

  arrayHorasTotal1 = [];
  arrayHorasTotal2 = [];
  arrayHorasTotal3 = [];
  arrayHorasTotal4 = [];
  arrayHorasTotal5 = [];
  arrayHorasTotal6 = [];
  arrayHorasTotal7 = [];

  dia1 : String;
  dia2 : String;
  dia3 : String;
  dia4 : String;
  dia5 : String;
  dia6 : String;
  dia7 : String;

  diaS1 : String;
  diaS2 : String;
  diaS3 : String;
  diaS4 : String;
  diaS5 : String;
  diaS6 : String;
  diaS7 : String;


  constructor(private data : DataService, private comunicacion : ComunicacionService, private router : Router, private datePipe: DatePipe, private  alertCtrl : AlertController) {



  }

  ngOnInit() {

    this.numPista = (this.data.getNumPistaElegida() + 1); // OBTENEMOS LA PISTA SELECCIONADA
    this.nombre = this.data.getNombre();
    this.horaEntrada = this.data.getHoraEntrada();
    this.horaSalida = this.data.getHoraSalida();

    this.idUser = this.data.getidUsuario();
    this.idClub = this.data.getidClub();



    console.log(this.horaEntrada + "-" + this.horaSalida + " y el ID del CLUB ES: " + this.idClub);

    this.obtenerReservas();
    //this.calcular();
    // this.obtenerHoras();


  }

  obtenerReservas(){ // MÉTODO PARA OBTENER LAS RESERVAS

    var ole;

    this.comunicacion.obtenerReserva(this.idClub, this.numPista).subscribe((reserva : Reserva[]) => { // OBTENEMOS LAS RESERVAS

      this.reservas = reserva;

      console.log(this.reservas);

      for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + i);
        this.arrayFechasTotal.push( d );
      }

      this.dia1 = this.datePipe.transform(this.arrayFechasTotal[0], "dd-MM-yyyy"); // MODIFICAMOS LA FECHA A "STRING"
      this.diaS1 = this.datePipe.transform(this.arrayFechasTotal[0], "EEEE"); // OBTENEMOS EL DÍA DE LA SEMANA
      this.diaS1 = this.traducirDia1(this.diaS1); // TRADUCE EL DÍA

      this.dia2 = this.datePipe.transform(this.arrayFechasTotal[1], "dd-MM-yyyy");
      this.diaS2 = this.datePipe.transform(this.arrayFechasTotal[1], "EEEE");
      this.diaS2 = this.traducirDia1(this.diaS2);

      this.dia3 = this.datePipe.transform(this.arrayFechasTotal[2], "dd-MM-yyyy");
      this.diaS3 = this.datePipe.transform(this.arrayFechasTotal[2], "EEEE");
      this.diaS3 = this.traducirDia1(this.diaS3);

      this.dia4 = this.datePipe.transform(this.arrayFechasTotal[3], "dd-MM-yyyy");
      this.diaS4 = this.datePipe.transform(this.arrayFechasTotal[3], "EEEE");
      this.diaS4 = this.traducirDia1(this.diaS4);

      this.dia5 = this.datePipe.transform(this.arrayFechasTotal[4], "dd-MM-yyyy");
      this.diaS5 = this.datePipe.transform(this.arrayFechasTotal[4], "EEEE");
      this.diaS5 = this.traducirDia1(this.diaS5);

      this.dia6 = this.datePipe.transform(this.arrayFechasTotal[5], "dd-MM-yyyy");
      this.diaS6 = this.datePipe.transform(this.arrayFechasTotal[5], "EEEE");
      this.diaS6 = this.traducirDia1(this.diaS6);

      this.dia7 = this.datePipe.transform(this.arrayFechasTotal[6], "dd-MM-yyyy");
      this.diaS7 = this.datePipe.transform(this.arrayFechasTotal[6], "EEEE");
      this.diaS7 = this.traducirDia1(this.diaS7);


// RELLENEAMOS EL CUADRO DE HORAS
  var corteEntrada = this.horaEntrada.split(':');
  var horaEn = corteEntrada[0];
  var minutoEn = corteEntrada[1];

  var corteSalida = this.horaSalida.split(':');
  var horaSal = corteSalida[0];
  var minutoSal = corteSalida[1];

  this.horaNumEn = parseInt(horaEn);
  this.minutoNumEn = parseInt(minutoEn);

  this.horaNumSal = parseInt(horaSal);
  this.minutoNumSal = parseInt(minutoSal);


 this.arrayHoraTotal.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");

 this.arrayHorasTotal1.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal2.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal3.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal4.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal5.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal6.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal7.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");


  while(this.horaNumEn <= 24){
    this.minutoNumEn = this.minutoNumEn + 30;

    if(this.minutoNumEn >= 60){
      this.horaNumEn = this.horaNumEn + 1;
      this.minutoNumEn = 0;

    }
    if(this.horaNumEn == 24){

      this.horaNumEn = 0;
    }

    if(this.minutoNumEn == 0){
      this.arrayHoraTotal.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");

      this.arrayHorasTotal1.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal2.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal3.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal4.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal5.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal6.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal7.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");


    }else {
      this.arrayHoraTotal.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());

      this.arrayHorasTotal1.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal2.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal3.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal4.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal5.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal6.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal7.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());

    }

    if(this.horaNumEn == this.horaNumSal && this.minutoNumEn == this.minutoNumSal){
      break;
    }

    // FIN DEL RELLENO DE CUADRO DE HORAS
  }


    for(var j = 0; j < this.reservas.length; j++){ // MARCAMOS LAS HORAS RESERVADAS

      if(this.dia1 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal1.length; f++){

          if(this.arrayHorasTotal1[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal1[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal1[f] = '---';
          }

          if(this.arrayHorasTotal1[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal1[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal1[f] = '---';
          }

          if(this.arrayHorasTotal1[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal1[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal1[f] = '---';
          }
        }
      }

      if(this.dia2 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal2.length; f++){

          if(this.arrayHorasTotal2[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal2[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal2[f] = '---';
          }

          if(this.arrayHorasTotal2[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal2[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal2[f] = '---';
          }

          if(this.arrayHorasTotal2[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal2[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal2[f] = '---';
          }
        }
      }

      if(this.dia3 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal3.length; f++){

          if(this.arrayHorasTotal3[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal3[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal3[f] = '---';
          }

          if(this.arrayHorasTotal3[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal3[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal3[f] = '---';
          }

          if(this.arrayHorasTotal3[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal3[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal3[f] = '---';
          }
        }
      }

      if(this.dia4 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal4.length; f++){

          if(this.arrayHorasTotal4[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal4[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal4[f] = '---';
          }

          if(this.arrayHorasTotal4[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal4[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal4[f] = '---';
          }

          if(this.arrayHorasTotal4[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal4[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal4[f] = '---';
          }
        }
      }

      if(this.dia5 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal5.length; f++){

          if(this.arrayHorasTotal5[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal5[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal5[f] = '---';
          }

          if(this.arrayHorasTotal5[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal5[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal5[f] = '---';
          }

          if(this.arrayHorasTotal5[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal5[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal5[f] = '---';
          }
        }
      }

      if(this.dia6 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal6.length; f++){

          if(this.arrayHorasTotal6[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal6[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal6[f] = '---';
          }

          if(this.arrayHorasTotal6[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal6[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal6[f] = '---';
          }

          if(this.arrayHorasTotal6[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal6[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal6[f] = '---';
          }
        }
      }

      if(this.dia7 == this.reservas[j].fecha){

        for(var f = 0; f < this.arrayHorasTotal7.length; f++){

          if(this.arrayHorasTotal7[f] == this.reservas[j].horaEntrada){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal7[f] + " " +this.reservas[j].horaEntrada);
            this.arrayHorasTotal7[f] = '---';
          }

          if(this.arrayHorasTotal7[f] == this.reservas[j].horaIntermedia){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal7[f] + " " +this.reservas[j].horaIntermedia);
            this.arrayHorasTotal7[f] = '---';
          }

          if(this.arrayHorasTotal7[f] == this.reservas[j].horaSalida){
            console.log("COINCIDE LA SIGUIENTE HORA: " + this.arrayHorasTotal7[f] + " " +this.reservas[j].horaSalida);
            this.arrayHorasTotal7[f] = '---';
          }
        }
      }
  }
    },error => {
      // EN EL CASO DE QUE NO HAYA NINGUNA RESERVA, RELLENAMOS EL CUADRO IGUALMENTE
      console.log("Error",error);


      for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() + i);
        this.arrayFechasTotal.push( d );
      }

      this.dia1 = this.datePipe.transform(this.arrayFechasTotal[0], "dd-MM-yyyy");
      this.diaS1 = this.datePipe.transform(this.arrayFechasTotal[0], "EEEE");
      this.diaS1 = this.traducirDia1(this.diaS1);

      this.dia2 = this.datePipe.transform(this.arrayFechasTotal[1], "dd-MM-yyyy");
      this.diaS2 = this.datePipe.transform(this.arrayFechasTotal[1], "EEEE");
      this.diaS2 = this.traducirDia1(this.diaS2);

      this.dia3 = this.datePipe.transform(this.arrayFechasTotal[2], "dd-MM-yyyy");
      this.diaS3 = this.datePipe.transform(this.arrayFechasTotal[2], "EEEE");
      this.diaS3 = this.traducirDia1(this.diaS3);

      this.dia4 = this.datePipe.transform(this.arrayFechasTotal[3], "dd-MM-yyyy");
      this.diaS4 = this.datePipe.transform(this.arrayFechasTotal[3], "EEEE");
      this.diaS4 = this.traducirDia1(this.diaS4);

      this.dia5 = this.datePipe.transform(this.arrayFechasTotal[4], "dd-MM-yyyy");
      this.diaS5 = this.datePipe.transform(this.arrayFechasTotal[4], "EEEE");
      this.diaS5 = this.traducirDia1(this.diaS5);

      this.dia6 = this.datePipe.transform(this.arrayFechasTotal[5], "dd-MM-yyyy");
      this.diaS6 = this.datePipe.transform(this.arrayFechasTotal[5], "EEEE");
      this.diaS6 = this.traducirDia1(this.diaS6);

      this.dia7 = this.datePipe.transform(this.arrayFechasTotal[6], "dd-MM-yyyy");
      this.diaS7 = this.datePipe.transform(this.arrayFechasTotal[6], "EEEE");
      this.diaS7 = this.traducirDia1(this.diaS7);

  var corteEntrada = this.horaEntrada.split(':');
  var horaEn = corteEntrada[0];
  var minutoEn = corteEntrada[1];

  var corteSalida = this.horaSalida.split(':');
  var horaSal = corteSalida[0];
  var minutoSal = corteSalida[1];

  this.horaNumEn = parseInt(horaEn);
  this.minutoNumEn = parseInt(minutoEn);

  this.horaNumSal = parseInt(horaSal);
  this.minutoNumSal = parseInt(minutoSal);


 this.arrayHoraTotal.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");

 this.arrayHorasTotal1.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal2.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal3.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal4.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal5.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal6.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
 this.arrayHorasTotal7.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");


  while(this.horaNumEn <= 24){
    this.minutoNumEn = this.minutoNumEn + 30;

    if(this.minutoNumEn >= 60){
      this.horaNumEn = this.horaNumEn + 1;
      this.minutoNumEn = 0;

    }
    if(this.horaNumEn == 24){

      this.horaNumEn = 0;
    }

    if(this.minutoNumEn == 0){
      this.arrayHoraTotal.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");

      this.arrayHorasTotal1.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal2.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal3.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal4.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal5.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal6.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");
      this.arrayHorasTotal7.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString() + "0");


    }else {
      this.arrayHoraTotal.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());

      this.arrayHorasTotal1.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal2.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal3.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal4.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal5.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal6.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());
      this.arrayHorasTotal7.push(this.horaNumEn.toString() + ":" + this.minutoNumEn.toString());

    }

    if(this.horaNumEn == this.horaNumSal && this.minutoNumEn == this.minutoNumSal){
      break;
    }
  }


    });


}
  reservar(i : number, i1 :number, i2 :number, f: String){ // MÉTODO PARA RESERVAR LA PISTA


    var ole = f;
    var repe = false;

    console.log(ole);

    console.log(i, i1, i2);

    var tope = this.arrayHoraTotal.length;

    console.log(tope);

    this.comunicacion.obtenerReserva(this.idClub, this.numPista).subscribe((reserva : Reserva[]) => { // OBTENEMOS LAS RESERVAS DE NUEVO PARA CONTROLAR QUE HAYAN RESERVADO JUSTAMENTE ANTES

      this.reservas = reserva;

      console.log(this.reservas);

      for(var x = 0; x < this.reservas.length; x++){
        if(ole == this.reservas[x].fecha){
          if(this.arrayHoraTotal[i] == this.reservas[x].horaEntrada || this.arrayHoraTotal[i] == this.reservas[x].horaIntermedia || this.arrayHoraTotal[i] == this.reservas[x].horaSalida
            || this.arrayHoraTotal[i+1] == this.reservas[x].horaEntrada || this.arrayHoraTotal[i+1] == this.reservas[x].horaIntermedia || this.arrayHoraTotal[i+1] == this.reservas[x].horaSalida || this.arrayHoraTotal[i+2] == this.reservas[x].horaEntrada || this.arrayHoraTotal[i+2] == this.reservas[x].horaIntermedia || this.arrayHoraTotal[i+2] == this.reservas[x].horaSalida) {
            this.presentAlertRepetido(); // SI LA RESERVA YA EXISTE MUESTRA VENTANA DE ALERTA
            repe = true;
            break;
          }
        }
      }

      if(repe == false){ // SI NO HAY RESERVA
        if(i1 >= tope || i2 >= tope){ // PEEEEEEERO SI SE PISA CON OTRA RESERVA....
          this.presentAlertError(); // ....MOSTRAMOS VENTANA DE ALERTA INDICANDO QUE NO PUEDE PISAR UNA HORA CON OTRA
        }else { // SI NO...
          this.presentAlertConfirm(i, ole); //.... QUE ACEPTE LA RESERVA
        }
      }

    },error => {

      // EN EL CASO DE QUE NO HAYA NINGUNA RESERVA
      console.log("Error",error);


      if(repe == false){
        if(i1 >= tope || i2 >= tope){
          this.presentAlertError();
        }else {
          this.presentAlertConfirm(i, ole);
        }
      }


    });








  }

  async presentAlertConfirm(i : number, fech : String) { // VENTANA DE ALERTA PARA CONFIRMAR SI QUIERE LA RESERVA
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: '¿Deseas reservas la pista?' ,
      message: 'El día ' + fech + ' a las ' + this.arrayHoraTotal[i] + ' hasta las ' + this.arrayHoraTotal[i+3],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Reservar',
          handler: () => {
            console.log('Confirm Okay');

            this.form = new FormGroup ({ // RELLENAEL FORMULARIO EN EL CASO DE CONFIRMAR LA RESERVA
            idUsuario : new FormControl(this.idUser,[Validators.required, Validators.minLength(1)]),
            idClub : new FormControl(this.idClub,[Validators.required, Validators.minLength(1)]),
            pista : new FormControl(this.numPista,[Validators.required, Validators.minLength(1)]),
            horaEntrada : new FormControl(this.arrayHoraTotal[i],[Validators.required, Validators.minLength(2)]),
            horaIntermedia : new FormControl(this.arrayHoraTotal[i+1],[Validators.required, Validators.minLength(2)]),
            horaSalida : new FormControl(this.arrayHoraTotal[i+2],[Validators.required, Validators.minLength(2)]),
            fecha : new FormControl(fech,[Validators.required, Validators.minLength(2)])
          });



        this.comunicacion.registrarReserva(this.form.value).subscribe((reserva: Reserva) => { // REGISTRA LA RESERVA

          console.log("EXITOOOOOOOOOOOOOOOOOOOOOOOOOOO");

          this.presentAlert();
            this.router.navigate(['/logo']);
            },error => {
        console.log("Error",error);
          });

          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() { // VENTANA DE ALERTA INDICANDO QUE SE HA RESERVADO LA PISTA
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Pista reservada',
      message: 'Su pista ha sido reservada.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertError() { // VENTANA DE ALERTA PARA MOSTRAR CUANDO EL USUARIO QUIERE RESERVAR FUERA DEL RANGO HORARIO
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Pista fuera de horario',
      message: 'No puedes alquilar una pista fuera de su rango horario.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentAlertRepetido() { // VENTANA DE ALERTA SI SE PISA CON UNA PISTA YA RESERVADA
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Pista ya reservada',
      message: 'No puedes alquilar que ya está reservada.',
      buttons: ['OK']
    });

    await alert.present();
  }

  traducirDia1(diaS1 : String){ // TRADUCTOR DE DÍAS

    if(diaS1 == 'Monday'){
      diaS1 = 'Lunes'
    }
    if(diaS1 == 'Tuesday'){
      diaS1 = 'Martes'
    }
    if(diaS1 == 'Wednesday'){
      diaS1 = 'Miércoles'
    }
    if(diaS1 == 'Thursday'){
      diaS1 = 'Jueves'
    }
    if(diaS1 == 'Friday'){
      diaS1 = 'Viernes'
    }
    if(diaS1 == 'Saturday'){
      diaS1 = 'Sábado'
    }
    if(diaS1 == 'Sunday'){
      diaS1 = 'Domingo'
    }

    return diaS1;

  }


  traducirDia2(diaS2 : String){

    if(diaS2 == 'Monday'){
      diaS2 = 'Lunes'
    }
    if(diaS2 == 'Tuesday'){
      diaS2 = 'Martes'
    }
    if(diaS2 == 'Wednesday'){
      diaS2 = 'Miércoles'
    }
    if(diaS2 == 'Thursday'){
      diaS2 = 'Jueves'
    }
    if(diaS2 == 'Friday'){
      diaS2 = 'Viernes'
    }
    if(diaS2 == 'Saturday'){
      diaS2 = 'Sábado'
    }
    if(diaS2 == 'Sunday'){
      diaS2 = 'Domingo'
    }

    return diaS2;

  }

  traducirDia3(diaS3 : String){

    if(diaS3 == 'Monday'){
      diaS3 = 'Lunes'
    }
    if(diaS3 == 'Tuesday'){
      diaS3 = 'Martes'
    }
    if(diaS3 == 'Wednesday'){
      diaS3 = 'Miércoles'
    }
    if(diaS3 == 'Thursday'){
      diaS3 = 'Jueves'
    }
    if(diaS3 == 'Friday'){
      diaS3 = 'Viernes'
    }
    if(diaS3 == 'Saturday'){
      diaS3 = 'Sábado'
    }
    if(diaS3 == 'Sunday'){
      diaS3 = 'Domingo'
    }

    return diaS3;

  }

  traducirDia4(diaS4 : String){

    if(diaS4 == 'Monday'){
      diaS4 = 'Lunes'
    }
    if(diaS4 == 'Tuesday'){
      diaS4 = 'Martes'
    }
    if(diaS4 == 'Wednesday'){
      diaS4 = 'Miércoles'
    }
    if(diaS4 == 'Thursday'){
      diaS4 = 'Jueves'
    }
    if(diaS4 == 'Friday'){
      diaS4 = 'Viernes'
    }
    if(diaS4 == 'Saturday'){
      diaS4 = 'Sábado'
    }
    if(diaS4 == 'Sunday'){
      diaS4 = 'Domingo'
    }

    return diaS4;

  }

  traducirDia5(diaS5 : String){

    if(diaS5 == 'Monday'){
      diaS5 = 'Lunes'
    }
    if(diaS5 == 'Tuesday'){
      diaS5 = 'Martes'
    }
    if(diaS5 == 'Wednesday'){
      diaS5 = 'Miércoles'
    }
    if(diaS5 == 'Thursday'){
      diaS5 = 'Jueves'
    }
    if(diaS5 == 'Friday'){
      diaS5 = 'Viernes'
    }
    if(diaS5 == 'Saturday'){
      diaS5 = 'Sábado'
    }
    if(diaS5 == 'Sunday'){
      diaS5 = 'Domingo'
    }

    return diaS5;

  }

  traducirDia6(diaS6 : String){

    if(diaS6 == 'Monday'){
      diaS6 = 'Lunes'
    }
    if(diaS6 == 'Tuesday'){
      diaS6 = 'Martes'
    }
    if(diaS6 == 'Wednesday'){
      diaS6 = 'Miércoles'
    }
    if(diaS6 == 'Thursday'){
      diaS6 = 'Jueves'
    }
    if(diaS6 == 'Friday'){
      diaS6 = 'Viernes'
    }
    if(diaS6 == 'Saturday'){
      diaS6 = 'Sábado'
    }
    if(diaS6 == 'Sunday'){
      diaS6 = 'Domingo'
    }

    return diaS6;

  }

  traducirDia7(diaS7 : String){

    if(diaS7 == 'Monday'){
      diaS7 = 'Lunes'
    }
    if(diaS7 == 'Tuesday'){
      diaS7 = 'Martes'
    }
    if(diaS7 == 'Wednesday'){
      diaS7 = 'Miércoles'
    }
    if(diaS7 == 'Thursday'){
      diaS7 = 'Jueves'
    }
    if(diaS7 == 'Friday'){
      diaS7 = 'Viernes'
    }
    if(diaS7 == 'Saturday'){
      diaS7 = 'Sábado'
    }
    if(diaS7 == 'Sunday'){
      diaS7 = 'Domingo'
    }

    return diaS7;

  }




}
