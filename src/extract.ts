import config from "./config";

interface IError extends Error {
  status?: any;
  method?: any;
  url?: string | URL;
}

export const error = <
  Option extends { method: any; action: any },
  Xhr extends { status: any }
>(
  option: Option,
  xhr: Xhr
) => {
  let msg = `cannot ${option.method} ${option.action} ${xhr.status}'`,
    err: IError;

  err = new Error(msg);

  err.status = xhr.status;
  err.method = option.method;
  err.url = option.action;

  return err;
};

export const body = <Xhr extends { responseText?: any; response?: any }>(
  xhr: Xhr
) => {
  const text = xhr.responseText || xhr.response;

  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
};

export const jwt = () => {
  const token = localStorage.getItem(`${config.ui.prefix}_access_token`);

  if (!token) return null;

  const base64Url = token.split(".")[1],
    base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"),
    jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

  return JSON.parse(jsonPayload);
};
