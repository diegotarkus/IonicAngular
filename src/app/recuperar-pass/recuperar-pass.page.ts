import { useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
})

export class RecuperarPassPage{
  username: string = "";
  passRec: string = "";

  constructor(private dataService: DataService, public alertController: AlertController, private router: Router)  { }

  async ngOnInit() {}

  async buscarPassword(){
    this.dataService.obtenerUser(this.username).then(async (user) => {
      if (user){
        this.passRec = user.password;
        const siUser = await this.alertController.create({
          header: 'Contraseña recuperada',
          message: `Hola ${this.username}, tu contraseña es ${this.passRec}. Por favor, ingresa nuevamente`,
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.router.navigate(['/login']);
              }
            }
          ]
        })

        await siUser.present();
      } else {
        const notUser = await this.alertController.create({
          header: 'Usuario no encontrado',
          message: 'No se ha encontrado usuario.',
          buttons: [
            {
            text: 'OK',
          }]
        })

        await notUser.present();
      }  
    })
  };




}
