import { DataService } from './../../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-pistas',
  templateUrl: './mis-pistas.page.html',
  styleUrls: ['./mis-pistas.page.scss'],
})
export class MisPistasPage implements OnInit {

  nombre : String;
  numPistas : number;
  numeros : Number;
  arrayNum = ['1'];
  cont = 1;


  constructor(private data : DataService, private router : Router) { }

  ngOnInit() {

    this.nombre = this.data.getNombre(); // Obtenemos el nombre del club
    this.numPistas = this.data.getNumPistas(); // Obtenemos el número de pistas del club

    this.numeros = this.numPistas;

    while(this.cont != this.numeros){
      this.cont++;
      this.arrayNum.push(this.cont.toString());

      if(this.cont == 20){
        break;
      }
    }
  }


  verHoras(i : Number){ // Método para ver las horas de la pista número X-za

    this.data.setNumPistaElegida(i);
    this.router.navigate(['/mis-horas']);

  }

}
