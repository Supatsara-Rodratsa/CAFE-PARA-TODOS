import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../services/coffee.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product: Product | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
