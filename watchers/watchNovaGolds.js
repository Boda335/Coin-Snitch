const createWatcher = require('../utils/createMessageWatcher');
const buildFilter = require('../filters/novaGoldsFilter');

/**
 * @param {object} options
 * @param {Channel} options.channel
 * @param {string} options.botId
 * @param {string} options.userId
 * @param {number} options.amount
 * @param {number} options.timeout
 */
async function watchNovaGolds({ channel, botId, userId, amount, timeout }) {
    const filter = buildFilter({ botId, userId, amount });
    return createWatcher(channel, filter, timeout);
}

module.exports = watchNovaGolds;
