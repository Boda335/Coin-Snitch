import { Message } from 'discord.js';

interface FilterOptions {
  botId: string;
  userId: string;
  amount: number | number[];
}

export default ({ botId, userId, amount }: FilterOptions) => {
  const amounts = Array.isArray(amount) ? amount : [amount];

  return (message: Message): number | null => {
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
        return a;
      }
    }

    return null;
  };
};