import moment from "moment";
import config from "./config/index";

export const toOptions = <T>(obj: T) => {
  const res = [];

  Object.keys(obj).forEach((key) => {
    res.push({
      key,
      title: obj[key],
    });
  });

  return res;
};

export const toOptionsByKey = <Obj, Key>(obj: Obj, key: Key) => {
  const res = [];

  Object.keys(obj).forEach((opt) => {
    res.push({
      key: opt,
      title: obj[opt][key],
    });
  });

  return res;
};

export const toOptionsExtract = <Arr extends Array<any>, KeyKey, ValueKey>(
  arr: Arr,
  keyKey: KeyKey,
  valueKey: ValueKey
) =>
  arr.map((item) => ({
    key: item[keyKey],
    title: item[valueKey],
  }));

export const toUTC = <Date>(date: Date): string =>
  moment.utc(moment(date).format()).format(config.ui.dates.def) + "Z";
