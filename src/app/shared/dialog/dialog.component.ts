import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../services/coffee.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public subCategoryId: number;
  public subCategoryName: number;
  public form: FormGroup | undefined;
  public message: string = '';
  public url: any | undefined;
  public img: any = null;
  public newProduct: Product | undefined;
  public modifyProduct: Product | undefined;
  public wording: string = 'Add New Product Details';
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.subCategoryId = data.id;
    this.subCategoryName = data.name;
    this.modifyProduct = data.product || null;
    if (this.modifyProduct) this.wording = 'Modify Product Details';
    
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl( this.modifyProduct ? this.modifyProduct.name : null, [Validators.required]),
      details: new FormControl( this.modifyProduct ? this.modifyProduct.details :null, [Validators.required]),
      price: new FormControl( this.modifyProduct ? this.modifyProduct.price : null, [Validators.required]),
      isHighlightMenu: new FormControl(false)
    });
  }

  saveButtonClicked() {
    if (this.form?.touched && !this.form?.invalid) {
      this.setData();
      this.dialogRef.close({product: this.newProduct, isNewProduct: this.modifyProduct ? false : true});
    }
  }

  cancelButtonClicked() {
    this.dialogRef.close('cancel');
  }

  setData() {
    if (this.form) {
      this.newProduct = {
        name: this.form.get('name')?.value,
        details: this.form.get('details')?.value,
        price: this.form.get('price')?.value,
        image: this.modifyProduct && !this.url ? this.modifyProduct.image : this.url.split(";base64,").pop(),
        subCategoryId: this.subCategoryId,
        isHighlightMenu: this.modifyProduct ? this.modifyProduct .isHighlightMenu : false
      }
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        console.log(this.message);
        return;
    }

    const reader = new FileReader();    
    reader.readAsDataURL(files[0]); 
    reader.onload = async (_event) => { 
      this.url = reader.result;  
    }
  }

}
