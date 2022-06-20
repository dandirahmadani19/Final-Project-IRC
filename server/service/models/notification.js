const redis = new Redis({
  port: 12073, // Redis port
  host: "redis-12073.c256.us-east-1-2.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "gaZnF2S5H6DsFsRk9vx6JOeATjinPtJi",
  db: 0, // Defaults to 0
});

class ExpoToken {
  static async getTokenByUserId(userid){
    try {
      
    } catch (err) {
      
    }
  }

  static async getRelevantToken(arrayofuserid){
    try {
      
    } catch (err) {
      
    }
  }

  static async setToken(userid, token){
    try {
      
    } catch (err) {
      
    }
  }

  static async updateToken(userid, newToken){
    try {
      
    } catch (err) {
      
    }
  }
}

module.exports = ExpoToken