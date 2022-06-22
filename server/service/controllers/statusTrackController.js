const {
  StatusTracking,
  CrowdFunding,
  User,
  CrowdFundingProduct,
} = require("../models");

class ControllerStatusTracking {
  static async postStatusTracking(req, res, next) {
    try {
      const { CrowdFundingId, status, description } = req.body;
      const newStatus = await StatusTracking.create({
        CrowdFundingId,
        status,
        description,
      });
      res.status(201).json({
        message: "Status Tracking created successfully",
        data: newStatus,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllStatus(req, res, next) {
    try {
      const allStatus = await StatusTracking.findAll();
      res.status(200).json({
        message: "All Status Tracking",
        data: allStatus,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStatusById(req, res, next) {
    try {
      const { id } = req.params;
      const status = await StatusTracking.findAll({
        where: {
          CrowdFundingId: id,
        },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json({
        message: "Status Tracking",
        data: status,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllEntitiesParticipant(req, res, next) {
    // const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const statusMain = await StatusTracking.findAll({
        where: {
          CrowdFundingId: id,
        },
        include: [
          {
            model: CrowdFunding,
            attributes: ["id"],
            include: [
              {
                model: User,
                attributes: ["id"],
              },
            ],
          },
        ],
      });

      const statusParticipant = await StatusTracking.findAll({
        attributes: ["id"],
        where: {
          CrowdFundingId: id,
        },
        include: [
          {
            model: CrowdFunding,
            attributes: ["id"],
            include: [
              {
                model: CrowdFundingProduct,
                attributes: ["id"],
                where: { CrowdFundingId: id },
                include: [
                  {
                    model: User,
                    attributes: ["id"],
                  },
                ],
              },
            ],
          },
        ],
      });

      const getAllUserIdMain = statusMain.map(
        (item) => item.CrowdFunding.User.id
      );
      const getAllUserIdParticipant = statusParticipant.map((item) =>
        item.CrowdFunding.CrowdFundingProducts.map((item2) => item2.User.id)
      );

      const allUserId = [...getAllUserIdMain, ...getAllUserIdParticipant[0]];
      //   console.log(getAllUserIdParticipant);

      res.status(200).json({
        message: "All Status Tracking",
        data: allUserId,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerStatusTracking;
