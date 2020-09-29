export class Item {

  public id: number;
  public _about: string;
  public accessURL: string;
  public title: string;

  constructor(_about?:string, accessURL?:string, title?:string) {
    this.id = Math.random();
    this._about = _about ?? null;
    this.accessURL = accessURL ?? null;
    this.title = title ?? null;
  }

}
