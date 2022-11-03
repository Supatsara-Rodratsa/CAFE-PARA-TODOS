import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../services/coffee.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Product | undefined;
  @Input() highlightMenu: boolean = false;
  @Output() deleteItem = new EventEmitter<number>();
  @Output() modifyItem = new EventEmitter<Product>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onClickedDeleteItem() {
    if (this.product && this.product.id) {
      this.deleteItem.next(this.product.id);
    }
  }

  onClickedModifyItem() {
    if (this.product) this.modifyItem.next(this.product);
  }

}
