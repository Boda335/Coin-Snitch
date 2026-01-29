import { Message } from "discord.js";

const ALLOWED_BOT_IDS = new Set([
  "451379187031343104",
  "1276522930653630556",
]);

interface FilterOptions {
  userId: string;
  amount: readonly number[];
}

export default ({ userId, amount: amounts }: FilterOptions) => {
  return (
    _old: Message,
    newMessage: Message,
    usernameFallback: string = userId,
  ): number | null => {
    if (!ALLOWED_BOT_IDS.has(newMessage.author.id)) return null;

    const content = newMessage.content;

    for (const a of amounts) {
      const amountStr = `$${a}`;
      const doubleBacktick = `\`\`${amountStr}\`\``;
      const singleBacktick = `\`${amountStr}\``;

      const patterns = [
        new RegExp(
          `<:yes:1284538119420383282>\\s*\\*\\*Transfer successful! You have transferred ${doubleBacktick}.*?<@${userId}>.+has been deducted\\*\\*`,
          "i",
        ),
        new RegExp(
          `You have successfully transferred ${doubleBacktick}.*?<@${userId}>`,
          "i",
        ),
        new RegExp(
          `\\*\\*>\\s*<:yea:1079670590807474216>\\s*Successfully transfered ${singleBacktick}.*?to ${usernameFallback}!\\*\\*`,
          "i",
        ),
        new RegExp(
          `Transferred ${doubleBacktick} to <@${userId}>\\s*\\(\\(${userId}\\)\\)`,
          "i",
        ),
      ];

      if (patterns.some((p) => p.test(content))) {
        return a;
      }
    }

    return null;
  };
};
