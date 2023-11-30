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
  myForm: FormGroup = new FormGroup({
    title: new FormControl(),
    price: new FormControl(),
    processor: new FormControl(),
    memory: new FormControl(),
    SSD: new FormControl(),
    display: new FormControl(),
  });
  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit(): void {
    this.data = {
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
