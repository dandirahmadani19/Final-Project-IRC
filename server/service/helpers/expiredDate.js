const CronJob = require("node-cron");
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
// function StartJob() {
  // CronJob.schedule("42 04 * * *", () => {
    
  //     },
  //     {
  //       scheduled: true,
  //       timezone: "Asia/Jakarta",
  //     }
  //   );
// }

module.exports = {expiredDate,};
