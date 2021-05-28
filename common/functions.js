module.exports = {
  getObjectKeysSum: (obj) => {
    let sum = 0;
    for (const keys in obj) {
      if (obj.hasOwnProperty(keys)) {
        sum += parseInt(obj[keys]);
      }
    }
    return sum;
  },
};
