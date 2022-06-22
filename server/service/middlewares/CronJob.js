const { CrowdFunding } = require("../models");
const CronJob = require("node-cron");
const { expiredDate } = require("../helpers/expiredDate");

const scheduleCron = async (req, res, next) => {
    try {
        CronJob.schedule(
            "30 09 * * *",
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
            next()
    } catch (error) {
    }
} 



module.exports = scheduleCron;