export class Ingredient {

  private _id: number;
  private _name: string;
  private _image: string;
  private _amount: string;
  private _unitShort: string;

  constructor();
  constructor(id: number, name: string, image: string, amount: string, unitShort: string);

  constructor(id?: number, name?: string, image?: string, amount?: string, unitShort?: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.amount = amount;
    this.unitShort = unitShort;
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

  get image(): string {
    return this._image;
  }
  set image(image: string) {
    this._image = image;
  }

  get amount(): string {
    return this._amount;
  }
  set amount(amount: string) {
    this._amount = amount;
  }

  get unitShort(): string {
    return this._unitShort;
  }
  set unitShort(unitShort: string) {
    this._unitShort = unitShort;
  }

}
