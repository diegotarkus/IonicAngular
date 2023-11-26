import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor (private dataService: DataService, private router: Router) {}
  
  canActivate(): boolean {
    if (this.dataService.autorizado()) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
  

