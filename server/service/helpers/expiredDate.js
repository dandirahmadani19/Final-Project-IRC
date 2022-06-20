function expiredDate(setDate, data) {
  const setday = setDate; // User Set date Berapa Hari
  let date = new Date(data);
  Date.prototype.addDays = function (berapaHari) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + berapaHari);
    return date;
  };
  const dateSet = date.addDays(setday).toISOString().split("T")[0];
  return dateSet;
}

console.log(expiredDate(10, "2022-06-19T16:14:16.940Z"));

module.exports = expiredDate;
