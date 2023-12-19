import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');

  if (isUserLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
