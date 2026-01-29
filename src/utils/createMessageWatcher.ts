import { TextChannel, Message } from "discord.js";

/**
 * Creates a message collector that resolves with the first matching message or false on timeout.
 * @param channel - The text channel to watch
 * @param filter - Returns true if the message should be collected (and stops collector)
 * @param timeout - Timeout in milliseconds (default: 60000)
 * @returns Promise with collected message or false
 */
export default async function createMessageWatcher(
  channel: TextChannel,
  filter: (message: Message) => boolean,
  timeout: number = 60_000,
): Promise<Message | false> {
  return new Promise((resolve) => {
    const collector = channel.createMessageCollector({
      filter,
      time: timeout,
      max: 1,
    });

    collector.once("collect", (message: Message) => {
      resolve(message);
      collector.stop();
    });

    collector.once("end", (_, reason) => {
      if (reason === "time") resolve(false);
    });
  });
}
