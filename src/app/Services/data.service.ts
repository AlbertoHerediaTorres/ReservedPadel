import { Club } from './../Class/club';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  email : String;
  provincia : String;
  esAdmin : String;
  clubs : Club[];
  acceso = false;
  idUsuario : Number
  nombre: String;
  apellidos : String;
  telefono : String;
  idClub : number;
  numPistas : number;
  horaEntrada : String;
  horaSalida : String;
  direccion : String;
  municipio : String;
  numPista : number;

  constructor() { }

  setEmail(email){
    this.email = email;
  }

  getEmail(){
    return this.email;
  }

  setEsAdmin(esAdmin){
    this.esAdmin = esAdmin;
  }

  getEsAdmin(){
    return this.esAdmin;
  }

  setProvincia(provincia){
    this.provincia = provincia
  }

  getProvincia(){
    return this.provincia;
  }

  setIdUsuario(idUsuario){
    this.idUsuario = idUsuario;
  }

  getidUsuario(){
    return this.idUsuario;
  }

  setIdClub(idClub){
    this.idClub = idClub;
  }

  getidClub(){
    return this.idClub;
  }

  setNombre(nombre){
    this.nombre = nombre;
  }
  getNombre(){
    return this.nombre;
  }

  setApellidos(apellidos){
    this.apellidos = apellidos;
  }
  getApellidos(){
    return this.apellidos;
  }

  setTelefono(telefono){
    this.telefono = telefono;
  }
  getTelefono(){
    return this.telefono;
  }

  setClubs(clubs){
  this.clubs = clubs;
  }

  getClub(index: string){
    return this.clubs[index];
  }

  setNumPistas(numPistas){
    this.numPistas = numPistas;
  }

  getNumPistas(){
  return this.numPistas;
  }

  setHoraEntrada(horaEntrada){
  this.horaEntrada = horaEntrada;
  }

  getHoraEntrada(){
    return this.horaEntrada;
  }

  setHoraSalida(horaSalida){
    this.horaSalida = horaSalida

  }

  getHoraSalida(){
    return this.horaSalida;
  }

  setDireccion(direccion){
    this.direccion = direccion;
  }
  getDireccion(){
    return this.direccion;
  }

  setMunicipio(municipio){
    this.municipio = municipio;
  }
  getMunicipio(){
    return this.municipio;
  }

  setNumPistaElegida(numPista){
    this.numPista = numPista;
  }

  getNumPistaElegida(){
    return this.numPista;
  }


}
