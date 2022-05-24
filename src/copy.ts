type ObjOrNull = Object | null;

export const object = (obj: Object) => Object.assign({}, obj);
export const to = (from: Object, to: Object) => Object.assign(to, from);
export const deep = (obj: ObjOrNull) => {
  const res = {};

  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      res[key] = obj[key];
    } else if (Array.isArray(obj[key])) {
      res[key] = array(obj[key], true);
    } else if (obj[key]._isAMomentObject) {
      res[key] = obj[key];
    } else if (typeof obj[key] === "object") {
      res[key] = deep(obj[key]);
    } else {
      res[key] = obj[key];
    }
  });

  return res;
};

export const array = <Arr extends Array<any>>(arr: Arr, d?: boolean) =>
  arr.map((i) => {
    if (!i) return i;
    if (Array.isArray(i)) return array(i);
    if (typeof i === "object") return d ? deep(i) : object(i);
    return i;
  });

export const include = <Obj, Keys extends Array<any>>(obj: Obj, keys: Keys) => {
  const res = {};

  keys.forEach((key) => {
    res[key] = obj[key];
  });

  return res;
};

export const toClipboard = (data: string) => {
  return (e) => {
    e.preventDefault();

    const el = document.createElement("textarea");

    el.value = data;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";

    document.body.appendChild(el);

    el.select();
    document.execCommand("copy");

    document.body.removeChild(el);
  };
};
