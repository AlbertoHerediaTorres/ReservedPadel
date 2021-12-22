import { Inscripcion } from './../Class/inscripcion';

import { Club } from './../Class/club';

import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../Class/user';
import { Reserva } from '../Class/reserva';
import { Registro } from '../Class/registro';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  url = 'https://reservedpadel.000webhostapp.com/';

  constructor(private httpCliente: HttpClient) {

   }

   public login(user : User){ //COMRPUEBA SI EL USUARIO LOGUEADO ES CORRECTO
    return this.httpCliente.post<User>(`${this.url}login.php`, JSON.stringify(user));
   }

   public registerUser(user : User){ //REGISTRA A UN NUEVO USUARIO
    return this.httpCliente.post<User>(`${this.url}registro.php`, JSON.stringify(user));
   }

   public registerAdmin(user : User){ // REGISTRA A UN NUEVO USUARIO ADMINISTRADOR
    return this.httpCliente.post<User>(`${this.url}registroAdminClub.php`, JSON.stringify(user));
   }

   public registerMyClub(club : Club){ // REGISTRA A UN NUEVO CLUB
    return this.httpCliente.post<Club>(`${this.url}registroMyClub.php`, JSON.stringify(club));
   }

   public obtenerDatos(email : String){ // OBTIENE LOS DATOS DEL USUARIO
    return this.httpCliente.get<User>(`${this.url}obtenerDatos.php?id=${JSON.stringify(email)}`);
   }

   public obtenerClubs(provincia : String){ // OBTIENE LOS CLUBS POR PROVINCIAS
    return this.httpCliente.get<Club[]>(`${this.url}obtenerClubs.php?id=${JSON.stringify(provincia)}`);
   }

   public obtenerMyClub(userAdmin : String){ // OBTIENE LOS DATOS DE MI CLUB
    return this.httpCliente.get<Club>(`${this.url}obtenerDatosMyClub.php?id=${JSON.stringify(userAdmin)}`);
   }

   public editarDatosUsuario(user : User){ // EDITA LOS DATOS DEL USUARIO
    return this.httpCliente.post<User>(`${this.url}editarDatosUser.php`, JSON.stringify(user));
   }

   public inscribirseEnClubs(inscripcion : Inscripcion){ // PIDE LA INSCRIPCIÓN EN UN CLUB
    return this.httpCliente.post<Inscripcion>(`${this.url}inscripcionPendiente.php`, JSON.stringify(inscripcion));
   }

   public obtenerInscripciones(idClub : number){ //OBTIENE LAS INSCRIPCIONES PENDIENTES
    return this.httpCliente.get<Inscripcion[]>(`${this.url}obtenerInscripciones.php?id=${JSON.stringify(idClub)}`);
   }

   public registrarseEnClubs(inscripcion : Inscripcion){ // CUANDO EL ADMINSITRADOR ACEPTA, GUARDAR AL USUARIO EN SU CLUB
    return this.httpCliente.post<Inscripcion>(`${this.url}registrarseEnClub.php`, JSON.stringify(inscripcion));
   }

   public eliminarInscripcion(inscripcion : Inscripcion){ // ELIMINA LA INSCRIPCIÓN
    return this.httpCliente.post<Inscripcion>(`${this.url}eliminarInscripcion.php`, JSON.stringify(inscripcion));
   }

   public obtenerMisRegistros(idUsuario : number){ //OBTIENE LOS CLUBS EN LOS QUE ESTÁ REGISTRAOD EL USUARIO
    return this.httpCliente.get<Club[]>(`${this.url}obtenerMisRegistros.php?id=${JSON.stringify(idUsuario)}`);
   }

   public registrarReserva(reserva : Reserva){ // INSERTA UNA RESERVA EN LA PISTA X DEL CLUB X
    return this.httpCliente.post<Reserva>(`${this.url}registroReserva.php`, JSON.stringify(reserva));
   }

   public obtenerReserva(idClub : number, numPista : number){ // OBTIENE LAS RESERVAS DEL CLUB
    return this.httpCliente.get<Reserva[]>(`${this.url}obtenerReservas.php?id=`+idClub+'&pista='+numPista);
   }


   public editarDatosClub(club : Club){ // EDITA LOS DATOS DEL CLUB
    return this.httpCliente.post<Club>(`${this.url}editarDatosClub.php`, JSON.stringify(club));
   }

   public obtenerRegistros(idClub : number){ // OBTIENE LOS JUGADORES REGISTRADOS EN EL CLUB
    return this.httpCliente.get<Registro[]>(`${this.url}obtenerRegistros.php?id=${JSON.stringify(idClub)}`);
   }

   public eliminarRegistro(registro : Registro){ // ELIMINA A LOS JUGADORES REGISTRADOS EN EL CLUB
    return this.httpCliente.post<Registro>(`${this.url}eliminarRegistro.php`, JSON.stringify(registro));
   }

   public obtenerEmail(){ // OBTIENE LOS EMAILS REGISTRADOS PARA CONTROLAR QUE EL EMAIL NO ESTÉ PREVIAMENTE REGISTRADO
    return this.httpCliente.get(`${this.url}obtenerEmails.php`);
   }


   public obtenerClubsBuscador(palabra : String){ // PARA EL BUSCADOR DE LA PANTALLA REGISTER-CLUB
    return this.httpCliente.get<Club[]>(`${this.url}obtenerClubsBuscador.php?nombre=`+palabra);
   }

   public imagePerfil(image) { // PARA CAMBIAR LA FOTO ********* SIN TERMINAR **********
    return this.httpCliente.post(`${this.url}asignarImg.php`, JSON.stringify(image));
  }

  public insertImage(email, imagen) { // PARA SUBIR LA IMAGEN ****** SIN TERMINAR *********
    return this.httpCliente.get(`${this.url}insertImage.php?administrador=`+email+'&imagen='+imagen);
  }


  public eliminarReserva(idClub : number, horaEntrada : String, fecha : String){ // PARA QUE EL ADMINISTRADOR PUEDA ELIMINAR LA RESERVA PULSADA
    return this.httpCliente.get(`${this.url}eliminarReserva.php?idClub=`+idClub+'&horaEntrada='+horaEntrada+'&fecha='+fecha);
   }




}
