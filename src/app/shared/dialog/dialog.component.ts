import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilitiesService } from '../services/utilities.service';

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
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilitiesService: UtilitiesService
  ) {
    this.subCategoryId = data.id;
    this.subCategoryName = data.name
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      details: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      isHighlightMenu: new FormControl(false)
    });
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
