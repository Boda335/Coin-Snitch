const createWatcher = require('../utils/createMessageWatcher');
const buildFilter = require('../filters/novaGoldsFilter');

/**
 * @param {object} options
 * @param {Channel} options.channel
 * @param {string} options.botId
 * @param {string} options.userId
 * @param {number | number[]} options.amount
 * @param {number} options.timeout
 * @returns {Promise<{ message: import("discord.js").Message, amount: number }>}
 */
async function watchNovaGolds({ channel, botId, userId, amount, timeout }) {
    const filter = buildFilter({ botId, userId, amount });

    return new Promise((resolve, reject) => {
        createWatcher(channel, (message) => {
            const matchedAmount = filter(message);
            if (matchedAmount !== null) {
                resolve({ message, amount: matchedAmount });
                return true;
            }
            return false;
        }, timeout).catch(reject);
    });
}

module.exports = watchNovaGolds;
