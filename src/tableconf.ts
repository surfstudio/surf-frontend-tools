import * as filter from "./filter";

interface Col {
  key: any;
  dataIndex: any;
  showSorterTooltip: boolean;
  colSpan?: any;
}

export default <Precols>(precols: Precols) => {
  const res = [],
    nonDefKeys = [];

  Object.keys(precols).forEach((key) => {
    const cfg = precols[key],
      col: Col = {
        ...filter.exclude(cfg, nonDefKeys),
        key,
        dataIndex: key,
        showSorterTooltip: false,
      };

    cfg.headSpan !== void 0 && (col.colSpan = cfg.headSpan);

    res.push(col);
  });

  return res;
};
