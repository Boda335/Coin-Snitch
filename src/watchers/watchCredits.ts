import { Message, TextChannel } from "discord.js";
import createMessageWatcher from "../utils/createMessageWatcher";
import buildFilter from "../filters/creditsFilter";

interface WatchOptions {
  channel: TextChannel;
  botId: string;
  userId: string;
  amount: number | number[];
  timeout?: number;
}

export default async function watchCredits({
  channel,
  botId,
  userId,
  amount,
  timeout = 60_000,
}: WatchOptions): Promise<{ message: Message; amount: number } | false> {
  const amounts = Array.isArray(amount) ? amount : [amount];
  const filterFn = buildFilter({ botId, userId, amount: amounts });

  const message = await createMessageWatcher(
    channel,
    (msg: Message) => {
      const matched = filterFn(msg);
      return matched !== null;
    },
    timeout,
  );

  if (!message) return false;

  const matchedAmount = filterFn(message);
  if (matchedAmount === null) return false;

  return { message, amount: matchedAmount };
}
