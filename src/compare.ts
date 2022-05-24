import moment from "moment";

export const dates = <A, B>(a: A, b: B) => {
  if (!a && !b) return true;
  if (!a || !b) return false;

  const ma = moment(a),
    mb = moment(b);

  if (ma.isSame(mb)) return 0;
  return ma.isBefore(mb) ? 1 : -1;
};

export const arrays = <T>(a: T[], b: T[]): any => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  if (a.length === 0 && b.length === 0) return true;
  return a.reduce((res, val, index) => res && basic(val, b[index]), true);
};

export const objects = <
  A,
  B,
  Ignore extends { indexOf(searchElement: any, fromIndex?: any): number },
  Custom
>(
  a: A,
  b: B,
  ignore?: Ignore,
  custom?: Custom
): any =>
  Object.keys(a).reduce((res, key) => {
    if (custom && custom[key]) return res && custom[key](a[key], b[key]);

    if (ignore && ignore.indexOf(key) > -1) return res;
    if (!a[key] && !b[key]) return res;

    if (!b.hasOwnProperty(key)) return false;
    if (typeof a[key] !== typeof b[key]) return false;

    if (Array.isArray(a[key])) return res && arrays(a[key], b[key]);
    if (typeof a[key] === "object" && a[key] !== null && b[key] !== null)
      return res && objects(a[key], b[key]);

    return res && a[key] === b[key];
  }, true);

export const basic = <A, B>(a: A | B, b: A | B) => {
  if (!a && !b) {
    return true;
  }

  if (!a || !b) {
    return false;
  }

  if (typeof a === "object" && typeof b === "object") {
    return objects(a, b);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return arrays(a, b);
  }

  return a === b;
};

export const diffarr = <
  A extends { length: number },
  B extends { length: number }
>(
  a: A,
  b: B
) => {
  const max = Math.max(a.length, b.length),
    res = [];

  for (let i = 0; i < max; i++) {
    if (!basic(a[i], b[i])) {
      res.push({ a: a[i], b: b[i] });
    }
  }

  return res;
};

export const diff = <A, B>(a: A, b: B) => {
  const res: any = {};

  Object.keys(a).forEach((key) => {
    if (Array.isArray(a[key]) && Array.isArray(b[key])) {
      if (!arrays(a[key], b[key])) {
        res[key] = diffarr(a[key], b[key]);
      }
    } else if (
      typeof a[key] === "object" &&
      typeof b[key] === "object" &&
      !!a[key] &&
      !b[key]
    ) {
      if (!objects(a[key], b[key])) {
        res[key] = diff(a[key], b[key]);
      }
    } else if (a[key] !== b[key]) {
      res[key] = { a: a[key], b: b[key] };
    }
  });

  return res;
};

export const arrayAsNull = <A, B>(a: A | B, b: A | B) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return arrays(a, b);
  }

  if (!Array.isArray(a) && !Array.isArray(b)) {
    return a === b;
  }

  const ra = Array.isArray(a) ? a.length : 0,
    rb = Array.isArray(b) ? b.length : 0;

  return ra === rb;
};
