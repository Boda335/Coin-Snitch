import { Client, Message, PartialMessage, TextChannel } from "discord.js";
import buildFilter from "../filters/lutexBitsFilter";

interface WatchOptions {
  channel: TextChannel;
  userId: string;
  amount: number | number[];
  timeout?: number;
  client: Client;
}

export default async function watchLutexBits({
  channel,
  userId,
  amount,
  timeout = 60_000,
  client,
}: WatchOptions): Promise<{ message: Message; amount: number } | false> {
  const amounts = Array.isArray(amount) ? amount : [amount];
  const filter = buildFilter({ userId, amount: amounts });

  const targetUser = await client.users.fetch(userId).catch(() => null);

  return new Promise((resolve) => {
    let timeoutId: NodeJS.Timeout | null = setTimeout(() => {
      client.off("messageUpdate", listener);
      resolve(false);
    }, timeout);

    const listener = async (
      oldMsg: Message | PartialMessage,
      newMsg: Message | PartialMessage,
    ) => {
      try {
        const fullOld = oldMsg.partial
          ? await oldMsg.fetch().catch(() => null)
          : oldMsg;
        const fullNew = newMsg.partial
          ? await newMsg.fetch().catch(() => null)
          : newMsg;

        if (!fullOld || !fullNew || fullOld.partial || fullNew.partial) return;

        const matchedAmount = filter(
          fullOld,
          fullNew,
          targetUser?.username ?? userId,
        );

        if (matchedAmount !== null) {
          if (timeoutId) clearTimeout(timeoutId);
          client.off("messageUpdate", listener);
          resolve({ message: fullNew, amount: matchedAmount });
        }
      } catch (err) {
        console.debug("[LutexWatcher] Error in messageUpdate:", err);
      }
    };

    client.on("messageUpdate", listener);
  });
}
