const createWatcher = require('../utils/createMessageWatcher');
const buildFilter = require('../filters/creditsFilter');

/**
 * @param {object} options
 * @param {Channel} options.channel
 * @param {string} options.botId
 * @param {string} options.userId
 * @param {number} options.amount
 * @param {number} options.timeout
 */
async function watchCredits({ channel, botId, userId, amount, timeout }) {
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


module.exports = watchCredits;
