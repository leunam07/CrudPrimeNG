import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Item } from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  url: string = 'https://datos.gob.es/apidata/catalog/distribution';

  constructor(private http:HttpClient) { }

  getItems(): Observable<any>{
    return this.http.get(this.url)
      .pipe(
        map( resp => resp['result'].items
      )
    );
  }

  saveItem(item: Item){
    console.log('Saved!', item);
  }

  deleteItem(item: Item){
    console.log('Deleted!', item);
  }

}
