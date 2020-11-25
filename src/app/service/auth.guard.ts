import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth:AuthService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const role = this.auth.isAuthenticated();
      console.log(next.data.role[0]);
      for(var i=0;i<next.data.role.length;i++)
      {
        if(role === next.data.role[i])
        {
          // this.auth.role = role;
          return true;
        }
      }
      this.router.navigate(['/login']);
  }
  
}
