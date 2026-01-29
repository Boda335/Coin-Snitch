<div align="center">

![CoinSnitch Logo](https://i.postimg.cc/PJcGNKcL/ideogram-v3-0-Gaming-style-Git-Hub-banner-for-Discord-economy-tool-Coin-Snitch-dark-gradient-bac-0.png)

# CoinSnitch

### 🎯 Real-time Discord Currency Transfer Detection

[![Discord](https://img.shields.io/discord/1006273962986188881?logo=discord&logoColor=%23fff&label=Discord&labelColor=%23505050&color=%235E6AE9)](https://dsc.gg/enexus)
[![NPM Version](https://img.shields.io/npm/v/coinsnitch?color=5E6AE9&label=Version)](https://www.npmjs.com/package/coinsnitch)
[![NPM License](https://img.shields.io/npm/l/coinsnitch?color=5E6AE9&label=License)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**CoinSnitch** is a powerful TypeScript library for detecting virtual currency transfers in Discord. Monitor NovaGolds, LutexBits, Credits, and more with type-safe, real-time detection.

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Support](#-support)

</div>

---

## ✨ Features

- 🔷 **Full TypeScript Support** – Complete type definitions and IntelliSense
- 💱 **Multi-Currency Detection** – NovaGolds, LutexBits, Credits, and extensible for more
- ⚡ **Real-time Monitoring** – Instant detection via `messageCreate` and `messageUpdate` events
- 🎯 **Flexible Amount Matching** – Support for single or multiple amounts
- 🛡️ **Type-Safe** – Catch errors at compile time, not runtime
- 🔌 **Easy Integration** – Works seamlessly with Discord.js v13 & v14
- 🧩 **Modular Architecture** – Import only what you need
- ⚙️ **Highly Configurable** – Customizable timeouts and filters
- 📦 **Zero Dependencies** – Lightweight and efficient (only peer dependencies)

---

## 📦 Installation

```bash
npm install coinsnitch
```

```bash
yarn add coinsnitch
```

```bash
pnpm add coinsnitch
```

### Requirements

- Node.js 16.x or higher
- Discord.js v13 or v14
- TypeScript 4.7+ (for TypeScript projects)

---

## 🚀 Quick Start

### TypeScript Example

```typescript
import { Client, TextChannel } from 'discord.js';
import { watchNovaGolds } from 'coinsnitch';

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

client.on('messageCreate', async (message) => {
  if (message.content === '!transfer') {
    const result = await watchNovaGolds({
      channel: message.channel as TextChannel,
      botId: '123456789',
      userId: message.author.id,
      amount: [10, 50, 100],
      timeout: 60000
    });

    if (result) {
      message.reply(`✅ Transfer detected: $${result.amount}`);
    } else {
      message.reply('❌ No transfer detected within timeout');
    }
  }
});

client.login('YOUR_BOT_TOKEN');
```

### JavaScript Example

```javascript
const { Client } = require('discord.js');
const { watchCredits } = require('coinsnitch');

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

client.on('messageCreate', async (message) => {
  const result = await watchCredits({
    channel: message.channel,
    botId: '987654321',
    userId: message.author.id,
    amount: 25,
    timeout: 30000
  });

  if (result) {
    console.log(`Transfer confirmed: $${result.amount}`);
  }
});

client.login('YOUR_BOT_TOKEN');
```

---

## 📚 Documentation

### Available Watchers

#### `watchNovaGolds(options)`

Monitors NovaGolds currency transfers via `messageCreate` events.

**Options:**

```typescript
interface NovaGoldsWatchOptions {
  channel: TextChannel;     // Discord channel to monitor
  botId: string;             // Bot ID that sends transfer confirmations
  userId: string;            // User ID receiving the transfer
  amount: number | number[]; // Amount(s) to detect
  timeout?: number;          // Max wait time in ms (default: 60000)
}
```

**Returns:**

```typescript
Promise<WatchResult | false>

interface WatchResult {
  message: Message;  // The matched Discord message
  amount: number;    // The exact amount that was matched
}
```

**Example:**

```typescript
const result = await watchNovaGolds({
  channel: textChannel,
  botId: '123456789',
  userId: '987654321',
  amount: [5, 10, 20],
  timeout: 60000
});

if (result) {
  console.log(`Received ${result.amount} NovaGolds`);
  console.log(`Message ID: ${result.message.id}`);
}
```

---

#### `watchCredits(options)`

Monitors Credits currency transfers via `messageCreate` events.

**Options:**

```typescript
interface CreditsWatchOptions {
  channel: TextChannel;
  botId: string;
  userId: string;
  amount: number | number[];
  timeout?: number;
}
```

**Returns:** `Promise<WatchResult | false>`

**Example:**

```typescript
const result = await watchCredits({
  channel: message.channel as TextChannel,
  botId: '555666777',
  userId: targetUser.id,
  amount: 100
});
```

---

#### `watchLutexBits(options)`

Monitors LutexBits currency transfers via `messageUpdate` events (for edited messages).

**Options:**

```typescript
interface LutexBitsWatchOptions {
  channel: TextChannel;
  client: Client;            // Discord.js client instance
  userId: string;
  amount: number | number[];
  timeout?: number;
}
```

**Returns:** `Promise<WatchResult | false>`

**Example:**

```typescript
const result = await watchLutexBits({
  channel: message.channel as TextChannel,
  client: client,
  userId: '111222333',
  amount: [1, 5, 10, 50]
});

if (result) {
  await message.reply(`LutexBits transfer successful: $${result.amount}`);
}
```

---

### Advanced Usage

#### Multiple Amount Detection

```typescript
// Detect any of these amounts
const result = await watchNovaGolds({
  channel: channel,
  botId: botId,
  userId: userId,
  amount: [10, 25, 50, 100, 500]
});

// Returns the actual amount matched
if (result) {
  switch(result.amount) {
    case 10:
      console.log('Small transfer detected');
      break;
    case 100:
      console.log('Medium transfer detected');
      break;
    case 500:
      console.log('Large transfer detected!');
      break;
  }
}
```

#### Custom Timeout Handling

```typescript
const result = await watchCredits({
  channel: channel,
  botId: botId,
  userId: userId,
  amount: 50,
  timeout: 30000 // 30 seconds
});

if (!result) {
  console.log('Transfer not detected within 30 seconds');
  // Handle timeout logic here
}
```

#### Parallel Watching

```typescript
// Watch multiple currencies simultaneously
const [novaResult, creditsResult, lutexResult] = await Promise.all([
  watchNovaGolds({ channel, botId, userId, amount: 10 }),
  watchCredits({ channel, botId, userId, amount: 10 }),
  watchLutexBits({ channel, client, userId, amount: 10 })
]);

const successful = [novaResult, creditsResult, lutexResult]
  .filter(Boolean)
  .map(r => r!.amount);

console.log(`Detected transfers: ${successful.join(', ')}`);
```

---

## 🏗️ Project Structure

```
coinsnitch/
├── src/
│   ├── filters/
│   │   ├── creditsFilter.ts
│   │   ├── lutexBitsFilter.ts
│   │   └── novaGoldsFilter.ts
│   ├── utils/
│   │   └── createMessageWatcher.ts
│   ├── watchers/
│   │   ├── watchCredits.ts
│   │   ├── watchLutexBits.ts
│   │   └── watchNovaGolds.ts
│   ├── index.ts
│   └── index.d.ts
├── dist/                    # Compiled JavaScript
├── tsconfig.json
├── package.json
├── README.md
└── LICENSE
```

---

## 💡 Use Cases

- 🎮 **Economy Bots** – Track in-game currency transactions
- 🎰 **Gambling Systems** – Verify bet payments and payouts
- 🏪 **Shop Bots** – Confirm purchase transactions
- 🎁 **Giveaway Bots** – Validate prize distributions
- 📊 **Transaction Logging** – Monitor and record all transfers
- 🔐 **Payment Verification** – Ensure secure currency exchanges

---

## 🛠️ Supported Currencies

| Currency | Watcher Function | Event Type |
|----------|-----------------|------------|
| 💰 **Credits** | `watchCredits()` | `messageCreate` |
| 🌟 **NovaGolds** | `watchNovaGolds()` | `messageCreate` |
| 🧊 **LutexBits** | `watchLutexBits()` | `messageUpdate` |

### Adding Custom Currencies

CoinSnitch is designed to be extensible. You can create custom filters and watchers for any currency format.

---

## ⚠️ Important Notes

- **LutexBits** uses `messageUpdate` events (requires `MESSAGE_CONTENT` intent)
- **NovaGolds** and **Credits** use `messageCreate` events
- Always ensure your bot has the necessary Discord intents enabled
- Timeouts default to 60 seconds but can be customized
- The library returns `false` on timeout or no match

---

## 🔧 TypeScript Configuration

If you're using TypeScript, ensure your `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "lib": ["ES2021"]
  }
}
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 💬 Support

Need help? Have questions?

- 💬 [Join our Discord Server](https://discord.gg//9cfgTktxHm)
- 🐛 [Report Issues](https://github.com/Boda335/Coin-Snitch/issues)
- 📧 Contact: support@example.com

---

## 📄 License

This project is licensed under the **Apache License 2.0** – see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for the Discord.js community
- Special thanks to all contributors and testers
- Powered by TypeScript for enhanced developer experience

---

<div align="center">

**[⬆ Back to Top](#coinsnitch)**

Made with ❤️ by the Nexus Studio Team

</div>