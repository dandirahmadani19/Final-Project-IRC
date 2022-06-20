function expiredDate(setDate, data) {
  const setday = setDate; // User Set date Berapa Hari
  let date = new Date(data);
  Date.prototype.addDays = function (berapaHari) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + berapaHari);
    return date;
  };
  const dateSet = date.addDays(setday).toLocaleString().split(",")[0]
  return dateSet;
}

module.exports = expiredDate;
