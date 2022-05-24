interface Res {
  state?: (data: any, cb: any) => any;
  byval?: (data: any, cb: any) => any;
  bycheck?: (data: any, cb: any) => any;
  toggle?: (data: any, cb: any) => any;
  delayed?: (data: any, cb: any) => any;
  deval?: (data: any, cb: any) => any;
  decheck?: (data: any, cb: any) => any;
}

interface Cmp {
  state?: any;
  setState?: (prop1: any, prop2: any) => any;
  set?: any;
}

export const set = (cmp: Cmp) => {
  const res: Res = {},
    keys = Object.keys(cmp.state);

  keys.forEach((key) => {
    res[key] = <Val, Cb>(val: Val, cb: Cb) =>
      cmp.setState({ [key]: val }, typeof cb === "function" ? cb : void 0);
  });

  res.state = (data, cb) =>
    cmp.setState(data, typeof cb === "function" ? cb : void 0);
  res.byval = (key, cb) => (e) => res[key](e ? e.target.value : "", cb);
  res.bycheck = (key, cb) => (e) => res[key](e ? e.target.checked : "", cb);
  res.toggle = (key, cb) => () => res[key](!cmp.state[key], cb);
  res.delayed = (key, cb) => (val) => () => res[key](val, cb);
  res.deval = (key, cb) => (e) => res[key](e ? e.target.value : "", cb);
  res.decheck = (key, cb) => (e) => res[key](e ? e.target.checked : "", cb);

  return res;
};

export const addState = <Add>(cmp: Cmp, add: Add) => {
  cmp.state = cmp.state ? { ...cmp.state, ...add } : add;

  cmp.set = set(cmp);
};

export const range = (min: number, max: number, base?: number) => {
  const zero = base || 0,
    res = [];

  for (let i = zero + min; i <= zero + max; i++) {
    res.push(i);
  }

  return res;
};

export const uniq = () => "_" + Math.random().toString(36).substr(2, 9);

export const options = <Obj>(obj: Obj) => {
  const res = [];

  Object.keys(obj).forEach((key) => {
    res.push({
      key,
      title: obj[key],
    });
  });

  return res;
};

export const radio = <Obj>(obj: Obj) => {
  const res = [];

  Object.keys(obj).forEach((value) => {
    res.push({
      value,
      label: obj[value],
    });
  });

  return res;
};

export const optionsEx = <Arr extends any[], KeyKey, ValKey>(
  arr: Arr,
  keyKey: KeyKey,
  valKey: ValKey
) => {
  const res = [];

  if (!arr) return res;

  arr.forEach((item) => {
    res.push({
      key: item[keyKey],
      title: item[valKey],
    });
  });

  return res;
};

export const download = (
  filename: string,
  content: string | number | boolean,
  mime: string = "text/plain;charset=utf-8"
) => {
  const el = document.createElement("a");

  el.setAttribute("href", `data:${mime},${encodeURIComponent(content)}`);
  el.setAttribute("download", filename);

  el.style.display = "none";

  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
};

export const downloadBinary = (
  filename: string,
  content: BlobPart | ArrayBuffer
) => {
  const url = window.URL.createObjectURL(new Blob([content])),
    el = document.createElement("a");

  el.href = url;
  el.setAttribute("download", filename);

  el.style.display = "none";

  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
};
