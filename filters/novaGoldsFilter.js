module.exports = ({ botId, userId, amount }) => (message) =>
    message.author.id === botId &&
    message.content.includes('has transferred') &&
    message.content.includes(`<@${userId}>`) &&
    message.content.includes(`$${amount}`);
