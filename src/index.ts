/* VENDOR */
import lodash from "lodash";

/* APPLICATION */
import * as compare from "./compare";
import * as convert from "./convert";
import * as copy from "./copy";
import * as extract from "./extract";
import * as filter from "./filter";
import * as find from "./find";
import * as generate from "./generate";
import * as pageTools from "./pageTools";
import * as request from "./request";
import * as strings from "./strings";

import tableconf from "./tableconf";

const _ = {
  ...lodash,
  compare,
  convert,
  copy,
  extract,
  filter,
  find,
  generate,
  pageTools,
  request,
  strings,
  tableconf,
};

export default _;
