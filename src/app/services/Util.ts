export class Util {
  public static charToVal = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 8,
    g: 3,
    h: 5,
    i: 1,
    j: 1,
    k: 2,
    l: 3,
    m: 4,
    n: 5,
    o: 7,
    p: 8,
    q: 1,
    r: 2,
    s: 3,
    t: 4,
    u: 6,
    v: 6,
    w: 6,
    x: 5,
    y: 1,
    z: 7,
  };

  constructor(public dict: any) {}

  static calculateDestiny = (fullName: string) => {
    const names = fullName.toLowerCase().split(' ');

    let result = names.reduce((total, name) => {
      let sum = 0;
      for (let i = 0; i < name.length; i++) {
        sum += this.charToVal[name.charAt(i) as keyof typeof this.charToVal];
      }
      return this.reduceNumber(sum) + total;
    }, 0);

    return this.reduceNumber(result);
  };

  static calculateSoulUrge = (fullName: string) => {
    const regexp = /[aeiou]/gi;

    if (!fullName.toLowerCase().match(regexp)) {
      return 0;
    } else {
      let result = fullName
        .toLowerCase()
        .match(regexp)
        ?.reduce(
          (total, letter) =>
            total + this.charToVal[letter as keyof typeof this.charToVal],
          0
        );
      result = result ? result : 0;
      return this.reduceNumber(result);
    }
  };

  static calculatePersonality = (fullName: string) => {
    const regexp = /[^aeiou\s]/gi;

    if (!fullName.toLowerCase().match(regexp)) {
      return 0;
    } else {
      let result = fullName
        .toLowerCase()
        .match(regexp)
        ?.reduce(
          (total, letter) =>
            total + this.charToVal[letter as keyof typeof this.charToVal],
          0
        );
      result = result ? result : 0;
      return this.reduceNumber(result);
    }
  };

  static reduceNumber = (num: number): number => {
    // console.log('Calling reducenum for', num);
    if (num < 10) {
      // || num === 11 || num === 22 || num === 33) {
      return num;
    } else {
      let digit = num;
      num = 0;
      while (digit !== 0) {
        num += digit % 10;
        digit = Math.floor(digit / 10);
      }

      return this.reduceNumber(num);
    }
  };
}
