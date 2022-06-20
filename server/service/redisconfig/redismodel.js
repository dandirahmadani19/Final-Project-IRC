const redis = require("./redisconfig");
class ExpoToken {
  static async getTokenByUserId(userid) {
    try {
      const expotokens = JSON.parse(await redis.get("expoTokens"));

      let userIdToken = [];
      if (expotokens.length > 0) {
        userIdToken = expotokens.filter((el) => el.UserId == userid);
      }

      return userIdToken;
    } catch (err) {
      console.log(err);
    }
  }

  static async getRelevantToken(arrayofuserid) {
    try {
      //get all tokens
      const allTokens = JSON.parse(await redis.get("expoTokens"));
      //flter token
      const filteredTokens = [];
      allTokens.forEach((el) => {
        arrayofuserid.forEach((x) => {
          if (x == el.UserId) {
            filteredTokens.push(el.expoToken);
          }
        });
      });
      //return filtered token tanpa user id
      return filteredTokens;
    } catch (err) {
      console.log(err);
    }
  }

  static async setToken(userid, token) {
    try {
      const tokens = {
        UserId: +userid,
        expoToken: token,
      };

      const expotokens = JSON.parse(await redis.get("expoTokens"));

      if (!expotokens) {
        await redis.set("expoTokens", JSON.stringify([tokens]));
        return "ok";
      } else {
        expotokens.push(tokens);
        await redis.set("expoTokens", JSON.stringify(expotokens));
        return "ok";
      }
      //expotokens.push(tokens)
      //await redis.set("expoTokens",JSON.stringify(tokens))
    } catch (err) {
      console.log(err);
    }
  }

  static async updateToken(userid, newToken) {
    try {
      //get
      const existingTokens = JSON.parse(await redis.get("expoTokens"));

      //hapus token lama
      let newSetTokens = [];

      existingTokens.forEach((el) => {
        if (el.UserId != userid) {
          newSetTokens.push(el);
        }
      });


      //push token baru
      const newData = {
        UserId: +userid,
        expoToken: newToken,
      };

      newSetTokens.push(newData);
      //set tokens
      const updatedToken = await redis.set("expoTokens", JSON.stringify(newSetTokens));
      
      const freshSet = JSON.parse(await redis.get("expoTokens"));
      return freshSet;
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUserToken(userid) {
    try {
      const expoTokens = JSON.parse(await redis.get("expoTokens"));

      const afterDelete = [];

      expoTokens.forEach((el) => {
        if (el.UserId != userid) {
          afterDelete.push(el);
        }
      });

      await redis.set("expoTokens", JSON.stringify(afterDelete));

      return afterDelete;
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ExpoToken;
