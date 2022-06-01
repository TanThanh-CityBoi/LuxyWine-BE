const rangeFilter = (field, rangeList) => {
  const res = {
    $or: rangeList.map((obj) => {
      return {
        $and: [{ [field]: { $gt: obj._min } }, { [field]: { $lte: obj._max } }],
      };
    }),
  };
  return res;
};

const multipleValuesFilter = (field, valueList) => {
  const res = {
    $or: valueList.map((val) => {
      return { [field]: { $eq: val } };
    }),
  };
  return res;
};

const combineValuesFilter = (field, valueList) => {
  const res = {
    $and: valueList.map((val) => {
      return { [field]: { $eq: val } };
    }),
  };
  return res;
};

const combineFilter = (elements) => {
  if (!elements?.length) {
    return {};
  }
  const res = {
    $and: [...elements],
  };
  return res;
};

const multipleValuesInList = (field, valueList) => {
  const res = {
    [field]: {
      $elemMatch: {
        $in: [...valueList],
      },
    },
  };
  return res;
};

module.exports = {
  multipleValuesInList,
  rangeFilter,
  multipleValuesFilter,
  combineValuesFilter,
  combineFilter,
};
