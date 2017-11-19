export class Nutrient {

  private _title: string;
  private _amount: number;
  private _unit: string;
  private _percentOfDailyNeeds: number;

  constructor();
  constructor(title: string, amount: number, unit: string, percentOfDailyNeeds: number);

  constructor(title?: string, amount?: number, unit?: string, percentOfDailyNeeds?: number) {
    this.title = title;
    this.amount = amount;
    this.unit = unit;
    this.percentOfDailyNeeds = percentOfDailyNeeds;
  }

  get title(): string {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }

  get amount(): number {
    return this._amount;
  }
  set amount(amount: number) {
    this._amount = amount;
  }

  get unit(): string {
    return this._unit;
  }
  set unit(unit: string) {
    this._unit = unit;
  }

  get percentOfDailyNeeds(): number {
    return this._percentOfDailyNeeds;
  }
  set percentOfDailyNeeds(percentOfDailyNeeds: number) {
    this._percentOfDailyNeeds = percentOfDailyNeeds;
  }

}
