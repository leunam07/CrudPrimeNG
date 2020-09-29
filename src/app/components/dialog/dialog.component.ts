import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() display: boolean;
  @Input() title: string;
  @Input() itemFromList: Item;
  @Output() changeDisplay = new EventEmitter<boolean>();
  @Output() addItem = new EventEmitter<Item>();

  item: Item;

  constructor() { }

  ngOnInit(): void {
    this.item = new Item();
  }

  onShow(){
    this.itemFromList ? this.item = this.itemFromList : this.item = new Item();
  }

  onHide(){
    this.display = false;
    this.changeDisplay.emit(this.display);
  }

  save(){
    this.addItem.emit(this.item);
  }

}
