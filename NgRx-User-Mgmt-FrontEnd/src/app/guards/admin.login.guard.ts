import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  if (isAdminLoggedIn) {
    console.log('user already logged in');
    router.navigate(['/admin/dashboard']);
    return false;
  }

  return true;
};
