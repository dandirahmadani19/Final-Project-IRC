const { Expo } = require("expo-server-sdk");
const expo = new Expo({
  accessToken: "cXR8cTCGDA0Trrrm8F2s5HU8IoYr09jLixJzUuef",
});

const sendPushNotif = (tokens, notifPayload) => {
  let messages = [];
  for (let pushToken of tokens) {
    messages.push({
      to: pushToken,
      ...notifPayload,
    });
  }
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        
      }
    }
  })();
};

module.exports = {
  sendPushNotif,
};
