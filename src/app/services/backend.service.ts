import { Injectable } from '@angular/core';
import { Util } from './Util';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  title = 'Numerology Calculator';
  constructor() {}

  calculateNums = (name: string) => {
    return {
      s_n: Util.calculateSoulUrge(name),
      d_n: Util.calculateDestiny(name),
      p_n: Util.calculatePersonality(name),
    };
  };
}
