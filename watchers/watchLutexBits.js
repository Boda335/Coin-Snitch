const buildFilter = require("../filters/lutexBitsFilter");

/**
 * يراقب تحديثات الرسائل بحثًا عن عملية تحويل ناجحة
 * @param {Object} options
 * @param {TextChannel} options.channel
 * @param {string} options.botId
 * @param {string} options.userId
 * @param {number | number[]} options.amount
 * @param {number} [options.timeout=60000]
 * @param {Client} options.client
 * @returns {Promise<{ message: import("discord.js").Message, amount: number } | false>}
 */
async function watchLutexBits({
  channel,
  botId,
  userId,
  amount,
  timeout = 60000,
  client,
}) {
  const filter = buildFilter({ botId, userId, amount });

  await client.users.fetch(userId); // تأكد من وجود الكاش للاسم

  return new Promise((resolve) => {
    const listener = (oldMessage, newMessage) => {
      const matchedAmount = filter(oldMessage, newMessage);
      if (matchedAmount !== null) {
        client.off("messageUpdate", listener);
        resolve({ message: newMessage, amount: matchedAmount });
      }
    };

    client.on("messageUpdate", listener);

    setTimeout(() => {
      client.off("messageUpdate", listener);
      resolve(false); // لم يتم المطابقة خلال المهلة
    }, timeout);
  });
}

module.exports = watchLutexBits;
