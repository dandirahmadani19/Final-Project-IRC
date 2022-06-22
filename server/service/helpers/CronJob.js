const { expiredDate } = require("./expiredDate")
const { CrowdFunding } = require("../models/index")
const CronJob = require('node-cron');

function ScheduleJob() {
    CronJob.schedule(
        "13 11 * * *",
        async () => {
            try {
                const dataJob = await CrowdFunding.findAll({});
                const result = dataJob.map((item) => {
                    if (
                        item.expiredDay > 0 &&
                        item.status === "Open" &&
                        item.startDate !== null
                    ) {
                        const datadate = expiredDate(item.expiredDay, item.startDate);
                        const dateNow = new Date().toLocaleString().split(",")[0];
                        if (datadate === dateNow) {
                            CrowdFunding.update(
                                {
                                    status: "Failed",
                                },
                                { where: { id: item.id } }
                            );
                        }
                    }
                });
            } catch (error) {
            }
        },
        {
            scheduled: true,
            timezone: "Asia/Jakarta",
        })
    return "Cron Job Running";
}

module.exports = ScheduleJob;