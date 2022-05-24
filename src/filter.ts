import * as strings from "./strings";

export const bySubstring =
  <Keys extends any[]>(raw: string, keys: Keys) =>
  (item: string) => {
    if (!item) return false;

    const search = strings.toSimple(raw);

    if (typeof item === "object" && keys) {
      return keys
        .map((key) => strings.toSimple(item[key]).search(search) > -1)
        .includes(true);
    }

    return strings.toSimple(item).search(search) > -1;
  };

export const exclude = <Obj, Keys extends any[] | string>(
  obj: Obj,
  keys: Keys
) => {
  const res = {};

  Object.keys(obj).forEach((key) => {
    if (!keys.includes(key)) {
      res[key] = obj[key];
    }
  });

  return res;
};

export const diff =
  <Arr extends any[] | string>(arr: Arr, key: string | number | symbol) =>
  <Item extends {}>(item: Item) =>
    arr.indexOf(item[key]) < 0;

export const diffByKey =
  <Arr extends any[]>(arr: Arr, key: string) =>
  <Item>(item: Item) =>
    !arr || !arr.find((i) => i[key] === item[key]);
