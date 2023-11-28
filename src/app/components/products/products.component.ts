import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: IProducts[] | null = null;
  productsSubscription: Subscription = new Subscription();

  isAdmin: boolean = false;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // проверка прав админа
    // if (localStorage.getItem('admin') === 'true')
    this.isAdmin = true;

    this.productsSubscription = this.productsService
      .getProducts()
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent);
  }
}
