
![Logo](https://i.postimg.cc/nLrvZDKY/Add-a-heading-2.png)

<div align="center">

![Discord](https://img.shields.io/discord/1006273962986188881?logo=discord&logoColor=%23fff&logoSize=auto&label=Discord&labelColor=%23505050&color=%235E6AE9&link=https%3A%2F%2Fdiscord.gg%2Fethical-programmer-s-1188398653530984539)
![NPM License](https://img.shields.io/npm/l/coinsnitch?color=5E6AE9&label=License)

</div>

# CoinSnitch

**CoinSnitch** is a smart currency transfer listener for Discord bots, supporting multiple virtual currencies like NovaGolds, LutexBits, and standard Credits. It detects transfers in real-time by monitoring Discord channels or message updates.

```
✨ Built for Discord.js v14 & v13  
```

---

## 🔥 Features

- 💱 Supports Multiple Currency Types  
- 👀 Real-time Transfer Detection  
- 🧠 Smart Filtering per Currency  
- ⚙️ Modular & Scalable Design  
- 💬 Works with `messageCreate` and `messageUpdate`  
- 🔌 Lightweight & Easy to Integrate  
- 🔍 Fully Customizable Filters  
- 🧪 Fully Testable Functions  
- 🌍 Perfect for Economy Bots, Game Bots, and More

---

## 📦 Installation

```bash
npm install coinsnitch
```

---

## 💡 Usage Example

Here’s how to use CoinSnitch to detect currency transfers in a Discord bot:

### 🎯 `messageCreate` Event Example For watchLutexBits

```js
const { watchLutexBits } = require("coinsnitch");

client.on("messageCreate", async (message) => {
  const targetChannelId = ""; // Replace with your target channel ID

  if (message.author.bot) return;
  if (message.channel.id !== targetChannelId) return;

  const commands = ["!bits"];
  const commandPattern = commands
    .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`^(${commandPattern})\\s+<?@?(\\d{17,})>?\\s+(\\d+)$`, "i");

  const match = message.content.match(regex);
  if (!match) return;

  const bankId = ""; // Replace with your bank ID
  const amount = 1; // Replace with the amount you want to transfer
  const options = {
    channel: message.channel,
    client,
    userId: bankId,
    amount,
    timeout: 60000,
  };

  try {
    const result = await watchLutexBits(options);
    if (result) {
      await message.reply("The transfer was successful!");
      // More of your logic
    } else {
      await message.reply("The transfer failed.");
    }
  } catch (error) {
    console.error("Error in watchLutexBits:", error);
    await message.reply("An error occurred.");
  }
});

```
### 🎯 `messageCreate` Event Example For watchNovaGolds
```js
const { watchNovaGolds } = require("coinsnitch");

client.on("messageCreate", async (message) => {
  const targetChannelId = ""; // Replace with your channel ID
  const bankId = ""; // Replace with your bank ID
  const botId = ""; // Replace with Nova's ID
  const amount = 1; // Replace with desired transfer amount

  if (message.author.bot) return;
  if (message.channel.id !== targetChannelId) return;

  const commands = ["!golds"];
  const commandPattern = commands
    .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`^(${commandPattern})\\s+<?@?(\\d{17,})>?\\s+(\\d+)$`, "i");

  const match = message.content.match(regex);
  if (!match) return;

  const options = {
    botId,
    userId: bankId,
    amount,
    timeout: 60000,
    channel: message.channel,
  };

  try {
    const result = await watchNovaGolds(options);
    if (result) {
      await message.reply("✅ Transfer completed successfully.");
    } else {
      await message.reply("❌ Transfer failed.");
    }
  } catch (error) {
    console.error("Error during gold transfer:", error);
    await message.reply("⚠️ An unexpected error occurred.");
  }

```
### 🎯 `messageCreate` Event Example For watchCredits
```js
const { watchCredits } = require("coinsnitch");

client.on("messageCreate", async (message) => {
  const targetChannelId = ""; // Replace with your channel ID
  const bankId = ""; // Replace with your bank ID
  const botId = ""; // Replace with Nova's ID
  const amount = 1; // Replace with desired transfer amount

  if (message.author.bot) return;
  if (message.channel.id !== targetChannelId) return;

  const commands = ["c","C","#credit"];
  const commandPattern = commands
    .map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(`^(${commandPattern})\\s+<?@?(\\d{17,})>?\\s+(\\d+)$`, "i");

  const match = message.content.match(regex);
  if (!match) return;

  const options = {
    botId,
    userId: bankId,
    amount,
    timeout: 60000,
    channel: message.channel,
  };

  try {
    const result = await watchCredits(options);
    if (result) {
      await message.reply("✅ Transfer completed successfully.");
    } else {
      await message.reply("❌ Transfer failed.");
    }
  } catch (error) {
    console.error("Error during gold transfer:", error);
    await message.reply("⚠️ An unexpected error occurred.");
  }

```

---

## 🛠️ API Reference

Each watcher returns a Promise that resolves to `true` or `false` based on detection success.

### `watchNovaGolds(options)`
| Option      | Type     | Required | Description |
|-------------|----------|----------|-------------|
| `channel`   | Channel  | ✅       | The channel where the bot sends transfer confirmation |
| `botId`     | string   | ✅       | ID of the bot sending the transfer message |
| `userId`    | string   | ✅       | ID of the user receiving currency |
| `amount`    | number   | ✅       | Expected amount of currency transferred |
| `timeout`   | number   | ✅       | Timeout in milliseconds |

### `watchCredits(options)` — Same as above  
### `watchLutexBits(client, channel, options)`

Also supports `messageUpdate` for bots that edit messages instead of sending new ones.

---

## 📁 Folder Structure (If Cloned or Developed)

```
coin-snitch/
├── filters/
│   ├── creditsFilter.js
│   ├── lutexBitsFilter.js
│   └── novaGoldsFilter.js
├── utils/
│   └── createMessageWatcher.js
├── watchers/
│   ├── watchCredits.js
│   ├── watchLutexBits.js
│   └── watchNovaGolds.js
├── index.js
└── package.json
```

---

## 📌 Supported Currencies

- **💰 Credits**
- **🌟 NovaGolds**
- **🧊 LutexBits**
- (More currencies can be added easily!)

---

## 📬 Feedback & Support

If you have any feedback, ideas, or bugs to report:

- 💬 [Join our Discord](https://discord.gg/https://dsc.gg/enexus)

---

## 📘 License

This project is licensed under the Apache License — see the [`LICENSE`](./LICENSE) file for details.

