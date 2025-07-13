/**
 * @param {object} options
 * @param {string} options.botId
 * @param {string} options.userId
 * @param {number} options.amount
 * @returns {(message: import("discord.js").Message) => boolean}
 */
module.exports = ({ botId, userId, amount }) => (message) =>
    message.author.id === botId &&
    message.content.includes('has transferred') &&
    (
        message.content.includes(`<@!${userId}>`) ||
        message.content.includes(`<@${userId}>`)
    ) &&
    message.content.includes(`\`$${amount}\``);
