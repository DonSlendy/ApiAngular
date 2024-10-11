import { CanActivateFn } from '@angular/router';

export const authenticateGuard: CanActivateFn = (route, state) => {
  return true;
};
