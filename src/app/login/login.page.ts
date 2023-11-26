import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = "";
  password: string = "";

  constructor(
    private router: Router,
    private dataServices: DataService,
    public alertController: AlertController
  ){}

  ngOnInit() {
  }

  async ingresar(){
    this.dataServices.autorizar(this.username, this.password).then(async (autorizado) => {
      if (autorizado){
        console.log("Sesión iniciada como ", this.username);
        this.dataServices.setAutentico(true);
        this.router.navigate(['/home']);
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos ingresados no son válidos.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    })
  };
}
