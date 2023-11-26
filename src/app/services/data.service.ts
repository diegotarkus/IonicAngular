import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { LectorqrPageModule } from '../lectorqr/lectorqr.module';
import { LectorqrPage } from '../lectorqr/lectorqr.page';

@Injectable({
  providedIn: 'root'
})
export class DataService { private usuariosRegistrados: Dexie = new Dexie('db2'); 
  private esAutenticado: boolean = false;
  private userAutenticado: any;

  constructor() { 
    this.iniciaDb();
  }

  private iniciaDb(){
    this.usuariosRegistrados.version(1).stores({
      usuarios: '++id, rut, nombre, apellido, email, carrera, region, comuna, username, password, ultimoRegistrado, localizacion',
    });
  }

  anadirUser(user:any){
    console.log('registrando');
    return this.usuariosRegistrados.table('usuarios').add(user);
  }

  actualizarUser(ultimoRegistrado: any, localizacion: any){
    return this.usuariosRegistrados.table('usuarios').update(1, {ultimoRegistrado, localizacion})
  }

  obtenerUser(username: string){
    return this.usuariosRegistrados.table('usuarios').where('username').equals(username).first();
  }

  setAutentico(value: boolean){
    this.esAutenticado = value;
  }

  userDetalle() : any {
    return this.userAutenticado;
  }

  autorizado(): boolean {
    return this.esAutenticado;
  }

  autorizar(username: string, password: string): Promise<boolean> {
    return this.usuariosRegistrados.table('usuarios')
      .where({username, password})
      .first()
      .then((user) => {
        this.esAutenticado = !!user;
        if (this.esAutenticado) {
          this.userAutenticado = user;
        }
        return this.esAutenticado;
      }
    ).catch((error) => {
      console.log('error');
      return false;
    });
  }
}
