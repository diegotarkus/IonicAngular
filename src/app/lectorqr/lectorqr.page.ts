import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { BrowserQRCodeReader } from '@zxing/browser';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lectorqr',
  templateUrl: './lectorqr.page.html',
  styleUrls: ['./lectorqr.page.scss'],
})
export class LectorqrPage implements OnInit {
  codigoQR: string = "";
  localizacion: string = "";
  user: any;

  constructor(private dataService: DataService, public alertController: AlertController, private router: Router) {}

  ngOnInit() {

    const codeReader = new BrowserQRCodeReader();
    const videoElement = document.getElementById('videoElement') as HTMLVideoElement;

    codeReader.decodeFromVideoDevice(undefined, videoElement, async (result, error) => {
      if (result) {
        this.codigoQR = result.getText();
        console.log('Código QR escaneado.')
        this.getCurrentLocation();
        this.user = this.dataService.userDetalle();
      }
      if (error) {
        const errorQR = await this.alertController.create({
          header: "Error",
          message: "Error en leer código QR. Por favor, intente nuevamente.",
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/lectorQR']);
              }
            }
          ]
        });
      }
    });
  }

  async getCurrentLocation(){
    try{
      const coordenadas: GeolocationPosition = await Geolocation.getCurrentPosition();
      console.log("Coordenadas recibidas.")
      this.localizacion = `Latitud: ${coordenadas.coords.latitude}, Longitud: ${coordenadas.coords.longitude}`;
    }catch (error){
      const errorGeo = await this.alertController.create({
        header: "Error",
        message: "Error al obtener coordenadas de geolocalización",
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/lectorQR']);
            } 
          }
        ]
      });

    }
  }

  async guardarQR(){
    var ultimoRegistrado = this.codigoQR    
    var localizacion = this.localizacion

    this.dataService.actualizarUser(ultimoRegistrado, localizacion);
    const alert = await this.alertController.create({
      header: 'Datos guardados',
      message: 'Datos de QR y GPS ingresados.',
      buttons: ['Aceptar']
    });
    await alert.present();
    
  }    
}
