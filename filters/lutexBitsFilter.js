/**
 * فلتر للتحقق من رسائل التحويل من بوتات معينة
 * @param {Object} options
 * @param {string} options.botId - معرف البوت (غير مستخدم فعليًا)
 * @param {string} options.userId - معرف المستخدم المستلم
 * @param {number | number[]} options.amount - مبلغ واحد أو أكثر
 * @returns {(oldMessage: Message, newMessage: Message) => number | null}
 */
module.exports = ({ userId, amount }) => {
    const allowedBotIds = ['451379187031343104', '1276522930653630556'];
    const amounts = Array.isArray(amount) ? amount : [amount];

    return (oldMessage, newMessage) => {
        if (!allowedBotIds.includes(newMessage.author.id)) return null;

        for (const a of amounts) {
            const amountStr = `$${a}`;
            const doubleAmountStr = `\`\`${amountStr}\`\``;
            const singleAmountStr = `\`${amountStr}\``;

            const username = newMessage.client.users.cache.get(userId)?.username || '';

            const matched =
                // نمط XP Luna Bot
                (
                    newMessage.content.includes(`<:yes:1284538119420383282> **Transfer successful! You have transferred ${doubleAmountStr}`) &&
                    newMessage.content.includes(`<@${userId}>`) &&
                    newMessage.content.includes("has been deducted** <:xpluna:1284524822306750544>")
                ) ||

                // نمط البوت التقليدي
                (
                    newMessage.content.includes(`You have successfully transferred ${doubleAmountStr}`) &&
                    newMessage.content.includes(`<@${userId}>`)
                ) ||

                // نمط التأكيد المختصر (بـ يوزرنيم)
                newMessage.content === `**> <:yea:1079670590807474216> Successfully transfered ${singleAmountStr} bits to ${username}!**` ||

                // نمط التحويل المختصر الجديد
                (
                    newMessage.content.includes(`Transferred ${doubleAmountStr} to <@${userId}>`) &&
                    newMessage.content.includes(`\`\`(${userId})\`\``)
                );

            if (matched) return a;
        }

        return null;
    };
};
