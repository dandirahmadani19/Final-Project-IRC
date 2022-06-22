const app = require("../app");
const port = process.env.PORT || 3005;
const ScheduleJob = require("../helpers/CronJob")

ScheduleJob()
app.listen(port, () => {
  console.log("Running On port ", port);
});
