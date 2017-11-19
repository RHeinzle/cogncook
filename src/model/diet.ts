export class Diet {

  private _id: number;
  private _name: string;

  constructor();
  constructor(id: number, name: string);

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }

  get id(): number {
    return this._id;
  }
  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }

}
