import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/model/Item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  @Input() display: boolean;
  @Input() title: string;
  @Input() itemFromList: Item;
  @Output() changeDisplay = new EventEmitter<boolean>();
  @Output() changeTitle = new EventEmitter<string>();
  @Output() noItemSelected = new EventEmitter<boolean>();
  @Output() deleteItem = new EventEmitter<number>();
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.initMenuItems();
  }

  showDialog(title: string, action: string){
    if ((this.itemFromList && action == 'EDIT') || ((!this.itemFromList && action == 'NEW') )){
      this.display = true;
      this.title = title;
      this.changeDisplay.emit(this.display);
      this.changeTitle.emit(this.title);
    } else if (!this.itemFromList && action == 'EDIT') {
      this.noItemSelected.emit(true);
    } else{
      this.display = true;
      this.title = title;
      this.changeDisplay.emit(this.display);
      this.changeTitle.emit(this.title);
      this.noItemSelected.emit(false);
    }


  }


  initMenuItems(){
    this.menuItems = [
      {
        label: 'New Item',
        icon: 'pi pi-fw pi-plus',
        command: () => this.showDialog('New Item', 'NEW')
      },
      {
        label: 'Edit Item',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.showDialog('Edit Item', 'EDIT')
      },
      {
        label: "Delete Item",
        icon: 'pi pi-fw pi-times',
        command: () => !this.itemFromList 
                  ? this.noItemSelected.emit(true) : this.deleteItem.emit(this.itemFromList.id)
      }
    ]
  }

}
