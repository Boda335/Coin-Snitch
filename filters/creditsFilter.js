/**
 * @param {object} options
 * @param {string} options.botId
 * @param {string} options.userId
 * @param {number[] | number} options.amount
 * @returns {(message: import("discord.js").Message) => number | null}
 */
module.exports = ({ botId, userId, amount }) => {
    const amounts = Array.isArray(amount) ? amount : [amount];

    return (message) => {
        if (
            message.author.id !== botId ||
            !message.content.includes('has transferred') ||
            !(
                message.content.includes(`<@!${userId}>`) ||
                message.content.includes(`<@${userId}>`)
            )
        ) {
            return null;
        }

        for (const a of amounts) {
            if (message.content.includes(`\`$${a}\``)) {
                return a; // ← ترجع المبلغ اللي تم تطابقه
            }
        }

        return null;
    };
};
