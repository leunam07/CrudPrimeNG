import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { Item } from 'src/app/model/Item';

import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ MessageService ]
})
export class ListComponent implements OnInit {

  constructor(private itemService: ItemService, private messageService: MessageService) { }

  items: Item[] = [];
  cols: any[];
  displayDialog: boolean;
  titleDialog: string;
  item: Item;

  ngOnInit(): void {
    this.getItems();
    this.initCols();
    this.displayDialog = false;
    this.titleDialog = '';
  }

  getItems(){
    this.itemService.getItems().subscribe( 
      (resp:any) => this.items = resp.map( i => new Item(i._about, i.accessURL, i.title)),
      (err) => console.log(err),
    )
  }

  initCols(){
    this.cols = [
      {field: "_about", header:"About"},
      {field: "accessURL", header:"AccessURL"},
      {field: "title", header:"Title"}
    ];
  }

  saveItem(item: Item){
    const exists = this.items.filter(el => el.id !== item.id);
    if (exists.length < this.items.length){
      this.items = this.items.map(
        itemEdit => itemEdit.id === item.id ? item : itemEdit )
    }else{
      this.items = [...this.items, item];
    }
    this.itemService.saveItem(item);
    this.displayDialog = false;
    this.addSingle( 'success' , 'Item saved successfully!');
  }

  deleteItem(id: number){
    this.items = this.items.filter(elem => elem.id !== id);
    this.addSingle( 'success' , 'Item deleted successfully!');
    this.item = null;
  }

  verifyItem(noItemSelected){
    if(noItemSelected){
      this.addSingle( 'error' , 'No item selected!');
    } else {
      this.item = new Item();
    }  
  }

  addSingle(type: string, message: string) {
    this.messageService.add({severity: type, summary:'Notification', detail:message});
  }

}
