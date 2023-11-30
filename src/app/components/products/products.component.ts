import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef
  ) {}

  products: IProducts[] | null = null;
  productsSubscription: Subscription = new Subscription();
  basket: IProducts[] | null = null;
  basketSubscription: Subscription = new Subscription();

  isAdmin: boolean = false;

  ngOnInit(): void {
    // проверка прав админа
    // if (localStorage.getItem('admin') === 'true')
    this.isAdmin = true;

    this.productsSubscription = this.productsService
      .getProducts()
      .subscribe((data) => {
        this.products = data;
      });

    this.basketSubscription = this.productsService
      .getProductsFromBasket()
      .subscribe((data) => {
        this.basket = data;
      });
  }

  addToBasket(product: IProducts): void {
    product.count = 1;
    let findItem;

    if (this.basket && this.basket?.length > 0) {
      findItem = this.basket?.find((item) => item.id === product.id);
      if (findItem) {
        this.updateToBasket(findItem);
      } else {
        this.postToBasket(product);
      }
    } else {
      this.postToBasket(product);
    }
  }

  postToBasket(product: IProducts): void {
    this.productsService
      .postProductToBasket(product)
      .subscribe((data) => this.basket?.push(data));
  }

  updateToBasket(product: IProducts): void {
    if (typeof product.count === 'number') {
      product.count += 1;
    } else {
      // Handle the case where 'count' is undefined
      product.count = 1;
    }
    this.productsService
      .updateProductsToBasket(product)
      .subscribe((data) =>
        console.log('updateToBasket - need write logic', data)
      );
  }

  deleteItem(id: number): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        const index = this.products?.findIndex((item) => item.id === id);
        if (index !== undefined && index !== -1) {
          this.products?.splice(index, 1);
        }
        // this.ChangeDetectorRef.detectChanges();
      },
    });
  }

  openDialog(product?: IProducts): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = product;

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;
      if (data && data.id) {
        this.updateData(data);
      } else this.postData(data);
    });
  }

  private postData(data: IProducts): void {
    this.productsService
      .postProduct(data)
      .subscribe((data) => this.products?.push(data));
  }

  updateData(product: IProducts): void {
    this.productsService.updateProducts(product).subscribe((data) => {
      if (this.products) {
        this.products = this.products?.map((product) => {
          if (product.id === data.id) return data;
          else return product;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }
}
