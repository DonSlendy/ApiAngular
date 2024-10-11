import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../services/login.service.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginServiceService);
  const router = inject(Router);

  if(loginService.isAuthenticated()){
    return true;
  }else{
    return router.navigate(["/login"]);
  }

};
