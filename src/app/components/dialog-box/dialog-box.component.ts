import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProducts } from '../../models/products';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.isNew = false;
    }
  }

  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? ''),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    processor: new FormControl(this.data?.configure?.processor ?? ''),
    memory: new FormControl(this.data?.configure?.memory ?? ''),
    SSD: new FormControl(this.data?.configure?.SSD ?? ''),
    display: new FormControl(this.data?.configure?.display ?? ''),
  });

  isNew: boolean = !this.data;
  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      image: '../../../assets/images/Macbook-16-pro.jpeg',
      configure: {
        processor: this.myForm.value.processor,
        memory: this.myForm.value.memory,
        SSD: this.myForm.value.SSD,
        display: this.myForm.value.display,
      },
    };
    console.log(this.myForm.value);
    this.dialogRef.close(this.data);
  }

  ngOnInit(): void {}
}
