import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryDTO } from '../services/coffee.interface';

@Component({
  selector: 'app-tab-card',
  templateUrl: './tab-card.component.html',
  styleUrls: ['./tab-card.component.css']
})
export class TabCardComponent implements OnInit {

  @Input() category: CategoryDTO | undefined;
  @Output() selectedCategory = new EventEmitter<CategoryDTO>();

  constructor() { }
  public backgroundGradient: string ='';
  public image: string = '';

  ngOnInit(): void {
    if (this.category?.id == 1) {
      this.image = "assets/category/hot.png";
    } else if (this.category?.id == 2) {
      this.image = "assets/category/cold.png";
    } else {
      this.image = "assets/category/frappuccino.png";
    }
    
    this.backgroundGradient = `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.image})`;
  }

  onSelectedCategory() {
    if (this.category) {
       this.selectedCategory.next(this.category);
    }
  }

}
