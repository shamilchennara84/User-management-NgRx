import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);

  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

  if (!isUserLoggedIn) {
    router.navigate(['/']);
    return false
  }

  return true;
};
