const buildFilter = require('../filters/lutexBitsFilter');

/**
 * يراقب تحديثات الرسائل بحثًا عن عملية تحويل ناجحة
 * @param {Object} options
 * @param {TextChannel} options.channel - القناة النصية لمراقبتها
 * @param {string} options.botId - معرف البوت (ليس مستخدمًا فعليًا الآن)
 * @param {string} options.userId - معرف المستخدم المستلم
 * @param {number} options.amount - المبلغ المتوقع تحويله
 * @param {number} [options.timeout=60000] - المدة الزمنية للمراقبة (بالملي ثانية)
 * @param {Client} options.client - كائن ديسكورد
 * @returns {Promise<boolean>} - يرجع true إذا تم التحويل، false إن لم يتم.
 */
async function watchLutexBits({ channel, botId, userId, amount, timeout = 60000, client }) {
    const filter = buildFilter({ botId, userId, amount });

    const user = await client.users.fetch(userId);

    return new Promise((resolve) => {
        const listener = (oldMessage, newMessage) => {
            if (filter(oldMessage, newMessage)) {
                resolve(true);
                client.off('messageUpdate', listener);
            }
        };

        client.on('messageUpdate', listener);

        setTimeout(() => {
            client.off('messageUpdate', listener);
            resolve(false);
        }, timeout);
    });
}

module.exports = watchLutexBits;
