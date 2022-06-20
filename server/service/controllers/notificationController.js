const ExpoToken = require('../redisconfig/redismodel')

class NotificationController {
  static async postToken(req,res) {
    try {
      const {UserId, expoToken} = req.body
      const respon = ExpoToken.setToken(UserId,expoToken)

      res.status(201).json(respon)
    } catch (err) {
      console.log(err)
    }
  }

  static async getTokenByUserid(req,res){
    try {
      const { userid } = req.params
      const token = await ExpoToken.getTokenByUserId(userid)
      if (token.length === 0) {
        throw new Error("TOKEN_NOT_FOUND")
      }
      res.status(200).json(...token)
    } catch (err) {
      console.log(err)
    }
  }

  static async updateToken(req,res) {
    try {
      const {userid} = req.params
      const {expoToken} = req.body
      const updateToken = await ExpoToken.updateToken(userid,expoToken)

      res.status(200).json(updateToken)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteToken(req,res){
    try {
      const {userid} = req.params
      const newSet = await ExpoToken.deleteUserToken(userid)
      res.status(200).json(newSet)
    } catch (err) {
      console.log(err)
    }
  }
}



module.exports = NotificationController