export const by = <Key, List extends any[], Value>(
  key: Key,
  list: List,
  value: Value
) => list.find((item) => item[key] === value);
