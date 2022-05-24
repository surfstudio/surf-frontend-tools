type Formatter = any;
type F = (count: any) => any | Formatter;

export const count = <Variants>(
  raw: string | number,
  variants: Variants,
  formatter: Formatter
) => {
  const count = raw === void 0 ? 0 : raw,
    useZero = typeof formatter === "boolean" ? formatter : false,
    f: F = typeof formatter === "boolean" || !formatter ? (t) => t : formatter,
    v = !variants || f(count) === count ? variants : variants[2];

  return variants
    ? count === 0
      ? useZero
        ? `0 ${ending(0, v)}`
        : `Нет ${ending(0, v)}`
      : `${f(count)} ${ending(count, v)}`
    : f(count);
};

export const phone = (raw: string) =>
  raw // substr устарел
    ? `+${raw[0]} (${raw.substr(1, 3)}) ${raw.substr(4, 3)}-${raw.substr(
        7,
        2
      )}-${raw.substr(9, 2)}`
    : "—";

export const fileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} Кб`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(2)} Мб`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Гб`;
};

export const ending = <Variants>(num: number | string, variants: Variants) => {
  if (!variants) return "";

  if (typeof variants === "string") return variants;

  let inum: number;
  if (typeof num === "string") {
    inum = parseInt(num);
  }
  const rnum = inum % 100 < 20 ? inum % 100 : inum % 10;

  if (rnum === 0) return variants[3] ? variants[3] : variants[2];
  if (rnum > 4) return variants[2];
  if (rnum > 1) return variants[1];

  return variants[0];
};

export const rounder = (num: number) => {
  if (num < 1000) return num;
  if (num < 10000) return Math.floor(num / 100) / 10 + " тыс.";
  if (num < 100000) return Math.floor(num / 1000) + " тыс.";
  if (num < 1000000) return Math.floor(num / 1000) + " тыс.";
  if (num < 10000000) return Math.floor(num / 100000) / 10 + " млн.";
  return Math.floor(num / 1000000) + " млн.";
};

export const dbl = (num: string | number) => {
  if (typeof num === "string") {
    return parseInt(num) < 10 ? `0${parseInt(num)}` : num;
  }

  return num < 10 ? `0${num}` : num;
};

export const time = (seconds: number) => {
  const minutes = Math.floor(seconds / 60),
    secs = Math.floor(seconds - minutes * 60);

  return dbl(minutes) + ":" + dbl(secs);
};

const ruEn = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

export const makeSlug = (str: string) =>
  str
    .toLowerCase()
    .split("")
    .map((l) => (ruEn[l] !== void 0 ? ruEn[l] : l))
    .join("")
    .replace(/\W/g, "-");

export const toSimple = (str: string) =>
  str
    ? str
        .toLowerCase()
        .replace(/[^0-9a-zа-яё ]+/g, " ")
        .replace(/ +/g, " ")
        .trim()
    : "";

export const capitalize = (str: string) => str[0].toUpperCase() + str.substr(1);

export const toCamelCase = (str: string) =>
  str
    .split(/[ -_]/)
    .map((str, i) => (i === 0 ? str : capitalize(str)))
    .join("");

export const validateEmail = (email: string) => {
  const // eslint-disable-next-line
    re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const mstime = (raw: number) => {
  const mraw = Math.floor(raw / 60),
    m = mraw < 10 ? `0${mraw}` : mraw,
    sraw = Math.floor(raw - mraw * 60),
    s = sraw < 10 ? `0${sraw}` : sraw,
    ml = Math.floor((raw - mraw * 60 - sraw) * 10);

  return `${m}:${s}.${ml}`;
};
