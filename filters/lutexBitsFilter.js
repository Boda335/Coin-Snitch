/**
 * فلتر للتحقق من رسائل التحويل من بوتات معينة
 * @param {Object} options
 * @param {string} options.botId - معرف البوت (اختياري، غير مستخدم هنا مباشرة)
 * @param {string} options.userId - معرف المستخدم المستلم
 * @param {number} options.amount - المبلغ الذي يُفترض تحويله
 * @returns {(oldMessage: Message, newMessage: Message) => boolean}
 */
module.exports = ({ userId, amount }) => (oldMessage, newMessage) => {
    const allowedBotIds = ['451379187031343104', '1276522930653630556'];

    if (!allowedBotIds.includes(newMessage.author.id)) return false;

    const amountStr = `$${amount}`;

    return (
        // نمط XP Luna Bot
        (
            newMessage.content.includes(`<:yes:1284538119420383282> **Transfer successful! You have transferred \`\`${amountStr}\`\``) &&
            newMessage.content.includes(`<@${userId}>`) &&
            newMessage.content.includes("has been deducted** <:xpluna:1284524822306750544>")
        ) ||

        // نمط البوت التقليدي
        (
            newMessage.content.includes(`You have successfully transferred \`\`${amountStr}\`\``) &&
            newMessage.content.includes(`<@${userId}>`)
        ) ||

        // نمط التأكيد المختصر (بـ يوزرنيم)
        newMessage.content === `**> <:yea:1079670590807474216> Successfully transfered \`${amountStr}\` bits to ${newMessage.client.users.cache.get(userId)?.username || ''}!**` ||

        // ✅ نمط التحويل المختصر الجديد
        (
            newMessage.content.includes(`Transferred \`\`${amountStr}\`\` to <@${userId}>`) &&
            newMessage.content.includes(`\`\`(${userId})\`\``)
        )
    );
};
