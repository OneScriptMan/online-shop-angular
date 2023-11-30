import { Component, OnInit } from '@angular/core';

import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  basket: IProducts[] | undefined = [];
  basketSubscription: Subscription = new Subscription();

  /**
   * Initializes the component by subscribing to the products
   * service. On data retrieval, it updates the basket with
   * the fetched data.
   */
  ngOnInit(): void {
    this.basketSubscription = this.productsService
      .getProductsFromBasket()
      .subscribe((data) => {
        this.basket = data;
      });
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  decreaseCount(product: IProducts): void {
    if (product.count && product.count > 0) {
      product.count -= 1;
      // Call a service method to update the basket on the backend if necessary
      this.productsService.updateProductsToBasket(product).subscribe();
    }

    if (product.count === 0) {
      this.productsService.deleteProductFromBasket(product.id).subscribe(() => {
        this.basket = this.basket?.filter((item) => item.id !== product.id);
      });
    }
  }

  increaseCount(product: IProducts): void {
    if (!product.count) {
      product.count = 0;
    }
    product.count += 1;
    // Call a service method to update the basket on the backend if necessary
    this.productsService.updateProductsToBasket(product).subscribe();
  }
}
