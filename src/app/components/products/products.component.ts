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
  products: IProducts[] | null = null;
  productsSubscription: Subscription = new Subscription();

  isAdmin: boolean = false;

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private ChangeDetectorRef: ChangeDetectorRef
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

  // deleteItem(id: number): void {
  //   this.productsService
  //     .deleteProduct(id)
  //     .subscribe((data) => this.products?.splice(id, 1));
  //   this.ChangeDetectorRef.detectChanges();
  // }

  deleteItem(id: number): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        const index = this.products?.findIndex((item) => item.id === id);
        if (index !== undefined && index !== -1) {
          this.products?.splice(index, 1);
        }
        this.ChangeDetectorRef.detectChanges();
      },
    });
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      this.postData(data);
    });
  }

  private postData(data: IProducts): void {
    this.productsService
      .postProduct(data)
      .subscribe((data) => this.products?.push(data));
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
  }
}
