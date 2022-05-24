import axios from "axios";
import { asyncUpdate as _asyncUpdate, update as _update } from "reduxigen";

import * as extract from "./extract";
import config from "./config";

interface Ifix {
  count: any;
  page: any;
  search: any;
  sort: any;
}

interface Option {
  onProgress: any;
  data: any;
  file?:
    | any
    | {
        name: any;
      };
  filename: any;
  onError: any;
  onSuccess: any;
  method: any;
  action: any;
  withCredentials: any;
  headers: any;
}

interface Prexhr {
  upload: any;
  onerror: any;
  onload: () => any;
  status: number;
  responseText?: any;
  response?: any;
  open: (method: any, action: any, arg3: boolean) => any;
  setRequestHeader: (arg1: string, arg2: string) => any;
  send: (arg1: any) => any;
  abort: () => any;
}

const { CancelToken } = axios,
  cancels = {};

export const fix = <Ifix>({ count, page, search, sort, ...params }) => {
  const res = {
    ...params,
  };

  count && (res.size = count);
  page && (res.page = page - 1);
  search && (res.filter = search);

  if (sort) {
    res.sort = sort === "default" ? "" : sort;
  }

  return res;
};

export const options = () => ({
  validateStatus: null,
  headers: !!localStorage.getItem(`${config.ui.prefix}_access_token`)
    ? {
        Authorization: `${localStorage.getItem(
          `${config.ui.prefix}_access_token`
        )}`,
      }
    : {},
});

export const abort = (name: string | number | symbol) =>
  cancels[name] && cancels[name]();

const cancel = (name: string | number | symbol) => ({
  cancelToken: new CancelToken(function executor(token) {
    cancels[name] = token;
  }),
});

export const get = <Params extends { id: any }, Uniq>(
  endpoint: string,
  params: Params,
  uniq: Uniq
) => {
  const add = uniq || "",
    url =
      endpoint && endpoint.substr(0, 4) === "http"
        ? endpoint
        : (config.api.url + endpoint)
            .replace("/api/api", "/api")
            .replace("/v1/v1", "/v1")
            .replace("/v1//v1", "/v1"); //,
  //emptyParams = {};

  cancels[endpoint + add] && cancels[endpoint + add]();

  if (endpoint.includes("v1/file/download")) {
    return axios.get(url, {
      //emptyParams,
      ...options(),
      ...cancel(params.id),
    });
  } else {
    return axios.get(url, {
      params,
      ...options(),
      ...cancel(endpoint + add),
    });
  }
};

export const upload = (option: Option, prexhr: Prexhr) => {
  const xhr = prexhr || new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      const value = option.data[key];

      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
        return;
      }

      formData.append(key, option.data[key]);
    });
  }

  if (option.file instanceof Blob) {
    //Property 'name' does not exist on type 'Blob'.
    //formData.append(option.filename, option.file, option.file.name);
  } else {
    formData.append(option.filename, option.file);
  }

  xhr.onerror = (e) => {
    option.onError && option.onError(e);
  };

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(extract.error(option, xhr), extract.body(xhr));
    }

    return option.onSuccess(extract.body(xhr), xhr);
  };

  xhr.open(option.method, option.action, true);
  //xhr.setRequestHeader( 'Content-type', 'multipart/form-data' )

  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  if (headers["X-Requested-With"] !== null) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }

  Object.keys(headers).forEach((h) => {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });

  xhr.send(formData);

  return {
    abort: () => xhr.abort(),
  };
};

export const cleanUpload = (option: Option, prexhr: Prexhr) => {
  const xhr = prexhr || new XMLHttpRequest();

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = (e) => {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100;
      }
      option.onProgress(e);
    };
  }

  xhr.onerror = (e) => {
    option.onError && option.onError(e);
  };

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(extract.error(option, xhr), extract.body(xhr));
    }

    return option.onSuccess(extract.body(xhr), xhr);
  };

  xhr.open(option.method, option.action, true);
  xhr.setRequestHeader("Content-type", "application/octet-stream");

  if (option.withCredentials && "withCredentials" in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  if (headers["X-Requested-With"] !== null) {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  }

  Object.keys(headers).forEach((h) => {
    if (headers[h] !== null) {
      xhr.setRequestHeader(h, headers[h]);
    }
  });

  xhr.send(option.file);

  return {
    abort: () => xhr.abort(),
  };
};

export const load = <Params, Uniq>(
  endpoint: string,
  params: Params,
  uniq: Uniq
) => {
  const add = uniq || "",
    url =
      endpoint && endpoint.substr(0, 4) === "http"
        ? endpoint
        : (config.api.url + endpoint)
            .replace("/api/api", "/api")
            .replace("/v1/v1", "/v1")
            .replace("/v1//v1", "/v1");

  cancels[endpoint + add] && cancels[endpoint + add]();

  return axios.get(url, {
    params,
    responseType: "blob",
    ...options(),
    ...cancel(endpoint + add),
  });
};

export const remove = <Cfg>(endpoint: string, cfg: Cfg) =>
  axios.delete(config.api.url + endpoint, {
    ...options(),
    ...cfg,
  });

export const postFD = <Raw>(endpoint: string, raw: Raw) => {
  const body = new FormData(),
    opts = {
      ...options(),
    };

  opts.headers["Content-Type"] = "multipart/form-data";

  Object.keys(raw).forEach((key) => {
    body.append(key, raw[key]);
  });

  return axios.post(config.api.url + endpoint, body, opts);
};

export const post = <Body, Cfg, Uniq>(
  endpoint: string,
  body: Body,
  cfg: Cfg,
  uniq: Uniq
) => {
  const add = uniq || "",
    url =
      endpoint && endpoint.substr(0, 4) === "http"
        ? endpoint
        : (config.api.url + endpoint)
            .replace("/api/api", "/api")
            .replace("/v1/v1", "/v1")
            .replace("/v1//v1", "/v1");

  cancels[endpoint + add] && cancels[endpoint + add]();

  return axios.post(url, body, {
    ...options(),
    ...cancel(endpoint + add),
    ...cfg,
  });
};

export const patch = <Body, Cfg>(endpoint: string, body: Body, cfg: Cfg) =>
  axios.patch(config.api.url + endpoint, body, {
    ...options(),
    ...cfg,
  });

export const put = <Body, Cfg>(endpoint: string, body: Body, cfg: Cfg) =>
  axios.put(config.api.url + endpoint, body, {
    ...options(),
    ...cfg,
  });

const saveOne = (key: string, value: string) =>
  localStorage.setItem(
    key.replace("storage", config.ui.prefix).replace(/\./g, "_"),
    value
  );

const savior =
  <Value extends { status: any; data: any }, State>(
    key: string,
    handler: (value: Value, state: State) => any
  ) =>
  (value: Value, state: any) => {
    if (typeof value === "object") {
      if (value.status && value.data) {
        Object.keys(value.data).forEach((sub) => {
          saveOne("storage." + sub, value.data[sub]);
        });
      }
    } else {
      saveOne(key, value);
    }

    return handler(value, state);
  };

export const update = <Name, Req, Parser>(
  name: Name,
  req: Req,
  parser: Parser
) => _update(name, req, parser);

export const asyncUpdate = <Name>(
  name: Name,
  requester: (params: any) => any,
  parser: (event: any, nstate: any) => any
) => {
  return _asyncUpdate(
    name,
    (params: any) =>
      new Promise((resolve) =>
        requester(params)
          .then((event) => resolve(event))
          .catch((event) => {
            if (axios.isCancel(event)) return;

            return resolve(
              typeof event === "object" && event.status
                ? event
                : typeof event[Symbol.iterator] === "function"
                ? {
                    data: {
                      ...event,
                      error: true,
                      data: event.data || null,
                      code: event.message,
                      message: event.toJSON(),
                    },
                  }
                : {
                    data: {
                      error: true,
                      data: event.data || null,
                      code: event.message,
                      message: event.toJSON(),
                    },
                  }
            );
          })
      ),
    (event, state: any) => {
      const nstate = {
        ...state,
        networkError: false,
      };

      if (event.status === 401 && window.location.pathname !== "/login") {
        localStorage.removeItem(`${config.ui.prefix}_access_token`);
        localStorage.setItem(
          `${config.ui.prefix}_last_page`,
          window.location.href
        );
        window.location.href = "/login";
        return;
      }

      //nstate.globalError = event.status >= 500

      if (event.data.error || event.status >= 400) {
        nstate.networkError = {
          status: event.status,
        };
      }

      return parser(event, nstate);
    }
  );
};

export const requestAndSave = (
  key: string,
  req: (params: any) => any,
  handler: (value: any, state: any) => any
) => asyncUpdate(key, req, savior(key, handler));

export const updateAndSave = (
  key: string,
  handler: (value: { status: any; data: any }, state: any) => any
) => _update(key, savior(key, handler));
