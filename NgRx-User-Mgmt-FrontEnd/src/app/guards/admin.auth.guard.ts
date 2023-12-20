import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  if (!isAdminLoggedIn) {
    console.log('admin already logged in');
    router.navigate(['/admin']);
    return false;
  }

  return true;
};
