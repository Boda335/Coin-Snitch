import { Message, TextChannel, Client } from 'discord.js';

export interface WatchResult {
  message: Message;
  amount: number;
}

export interface BaseWatchOptions {
  channel: TextChannel;
  userId: string;
  amount: number | number[];
  timeout?: number;
}

export interface NovaGoldsWatchOptions extends BaseWatchOptions {
  botId: string;
}

export interface CreditsWatchOptions extends BaseWatchOptions {
  botId: string;
}

export interface LutexBitsWatchOptions extends BaseWatchOptions {
  client: Client;
}

export declare function watchNovaGolds(options: NovaGoldsWatchOptions): Promise<WatchResult | false>;
export declare function watchCredits(options: CreditsWatchOptions): Promise<WatchResult | false>;
export declare function watchLutexBits(options: LutexBitsWatchOptions): Promise<WatchResult | false>;