export class Instruction {

  private _number: number;
  private _step: string;

  constructor();
  constructor(number: number, step: string);

  constructor(number?: number, step?: string) {
    this.number = number;
    this.step = step;
  }

  get number(): number {
    return this._number;
  }
  set number(number: number) {
    this._number = number;
  }

  get step(): string {
    return this._step;
  }
  set step(step: string) {
    this._step = step;
  }

}
