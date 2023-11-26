import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { Comuna } from 'src/app/models/comuna';
import { Region } from 'src/app/models/region';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit{
  rut: string = "";
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  carrera: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  regiones: Region[]=[];
  comunas: Comuna[]=[];
  regionSeleccionada: number = 0;
  comunaSeleccionada: number = 0;
  regionSeleccionadaId = this.regionSeleccionada;
  comunaSeleccionadaId = this.comunaSeleccionada;

  constructor(
    private router: Router, 
    private locationservice: LocationService,
    private dataService: DataService,
    public alertController: AlertController)
   {}

  ngOnInit() {    
    this.cargarRegion();
  }

  async cargarRegion(){
    const req = await this.locationservice.getRegion();
    this.regiones = req.data;
  }

  async cargarComuna(){
    const req = await this.locationservice.getComuna(this.regionSeleccionada);
    this.comunas = req.data;
  }

  async mostrarAlerta(header: string, message: string){
    const Alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar']
    });
  }

  async guardar(){
    const regionSeleccionadaId = this.regionSeleccionada;
    const comunaSeleccionadaId = this.comunaSeleccionada;
    const regionSeleccionada = this.regiones.find(region => region.id === regionSeleccionadaId);
    const comunaSeleccionada = this.comunas.find(comuna => comuna.id === comunaSeleccionadaId);

    /*if (!this.rut) {
      await this.mostrarAlerta('RUT no ingresado', 'Favor ingresar RUT.');
      return;
    }

    if (!/^\d{9}$/.test(this.rut)) {
      await this.mostrarAlerta('RUT incorrecto', 'El RUT debe contener exactamente 9 dígitos numéricos.');
      return;
    }

    if (!this.nombre){
      await this.mostrarAlerta('Nombre requerido', 'Debes ingresar un nombre de usuario.');
      return;
    }

    if (this.nombre.length < 3 || this.nombre.length > 20) {
      await this.mostrarAlerta('Nombre incorrecto', 'El nombre debe tener entre 3 y 20 caracteres.');
      return;
    }

    if (!this.apellido) {
      await this.mostrarAlerta('Apellido requerido', 'Debes ingresar un apellido.');
      return;
    }

    if (this.apellido.length < 3 || this.apellido.length > 20) {
      await this.mostrarAlerta('Apellido incorrecto', 'El apellido debe tener entre 3 y 20 caracteres.');
      return;
    }

    if (!this.username) {
      await this.mostrarAlerta('Usuario requerido', 'Debes ingresar un nombre de usuario.');
      return;
    }

    if (this.username.length < 3 || this.username.length > 8) {
      await this.mostrarAlerta('Usuario incorrecto', 'El usuario debe tener entre 3 y 8 caracteres.');
      return;
    }

    if (!this.password) {
      await this.mostrarAlerta('Contraseña requerida', 'Debes ingresar una contraseña.');
      return;
    }

    if (!/^\d{4}$/.test(this.password)) {
      await this.mostrarAlerta('Contraseña incorrecta', 'La contraseña debe tener exactamente 4 números.');
      return;
    }

    if (!/^\d{4}$/.test(this.confirmPassword)) {
      await this.mostrarAlerta('Confirmación de contraseña incorrecta', 'La confirmación de contraseña debe contener exactamente 4 números.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.mostrarAlerta('Contraseñas no coinciden', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    if (!this.regionSeleccionada) {
      await this.mostrarAlerta('Región requerida', 'Debes seleccionar una región.');
      return;
    }
  
    if (!this.comunaSeleccionada) {
      await this.mostrarAlerta('Comuna requerida', 'Debes seleccionar una comuna.');
      return;
    }*/

    if (this.password === this.confirmPassword){      
      const user = {
        rut: this.rut,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        carrera: this.carrera,
        username: this.username,
        password: this.password,
        confirmPassword: this.confirmPassword,
        region: regionSeleccionada ? regionSeleccionada.nombre : "",
        comuna: comunaSeleccionada ? comunaSeleccionada.nombre : "",
        };

        this.dataService.anadirUser(user).then(() => {
          console.log('Registrado', user.username)
        });

      const successAlert = await this.alertController.create({
        header: 'Usuario registrado',
        message: 'Usuario registrado satisfactoriamente',
        buttons: [
          {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }]
      });

      await successAlert.present();

    };
  }
}
