import { Injectable } from '@angular/core';

@Injectable()
export class Helper {

    constructor() {
    }

    join(str: string[]): string {
      return (str ? str.join(',') : '');
    }

    capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

}
