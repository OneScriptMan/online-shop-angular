import { inject } from '@angular/core';
import {
  ResolveFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ProductsService } from './products.service';

import { IProductDetails } from '../models/products';
import { Router } from '@angular/router';

export const productResolver: ResolveFn<IProductDetails> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productsService: ProductsService = inject(ProductsService),
  router: Router = inject(Router)
): Observable<IProductDetails> => {
  return productsService.getProduct(route.params['id']).pipe(
    catchError(() => {
      router.navigate(['products']);
      return EMPTY;
    })
  );
};
