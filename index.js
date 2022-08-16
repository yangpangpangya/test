/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (propertyArr, target) => {
  const res = [];
  target.forEach((element) => {
    const obj = {};
    Object.keys(element).forEach((item) => {
      if (!propertyArr.includes(item)) {
        obj[item] = element[item];
      }
    });
    res.push(obj);
  });
  return res;
};
exports.excludeByProperty = (pro, arr) => {
  const res = [];
  arr.forEach((item) => {
    let havePro = false;
    if (Object.keys(item).includes(pro)) {
      havePro = true;
    }
    if (!havePro) {
      res.push(item);
    }
  });
  return res;
};
exports.sumDeep = (arr) => {
  const res = arr.map(item => ({
    objects: item.objects.reduce((a, b) => a + b.val, 0),
  }));
  return res;
};
exports.applyStatusColor = (color, status) => {
  const map = new Map();
  Object.keys(color).forEach((item) => {
    color[item].forEach((code) => {
      map.set(code, item);
    });
  });
  const res = [];
  status.forEach((item) => {
    if (map.has(item.status)) {
      res.push({
        ...item,
        color: map.get(item.status),
      });
    }
  });
  return res;
};
exports.createGreeting = (fn, arr) => {
  return (name) => {
    return fn(arr, name);
  };
};
exports.setDefaults = (proObj) => {
  return (obj) => {
    for (const i in proObj) {
      if (obj[i] === undefined) {
        obj[i] = proObj[i];
      }
    }
    // return Object.assign({}, obj, proObj); // 这个为什么没通过呢？感觉是可以的呀
    return obj;
  }
};
exports.fetchUserByNameAndUsersCompany = async (name, s) => {
  const userInfo = {};
  const userRes = await s.fetchUsers();
  const targetUserIdx = userRes.findIndex((item) => {
    return item.name === name;
  });
  userInfo.user = userRes[targetUserIdx];
  const {
    companyId
  } = userRes[targetUserIdx];
  const companyRes = await s.fetchCompanyById(companyId);
  userInfo.company = companyRes;
  const status = await s.fetchStatus();
  userInfo.status = status;
  return userInfo;

};