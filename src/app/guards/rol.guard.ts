import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../services/login.service.service';

export const rolGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginServiceService);
  const rout = inject(Router);

  const expectedRole = route.data['expectedRole'];


  if(loginService.hasRole(expectedRole)){
    return true;
  }else{
    console.log("No se encontró un rol para navegar");

    return false;
  }

};
