import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cookieService = inject(CookieService)

  if (!cookieService.get("token")) {
    return true;
  } else {
    return router.navigate(["/users"]);
  };
};
