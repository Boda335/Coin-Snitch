
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

## 💡 Usage Examples

### 🎯 `messageUpdate` Example – `watchLutexBits`

```js
const { watchLutexBits } = require("coinsnitch");

client.on("messageCreate", async (message) => {
  const options = {
    client,
    channel: message.channel,
    userId: "USER_ID",
    amount: [5, 10], // Supports multiple amounts
    timeout: 60000
  };

  const result = await watchLutexBits(options);

  if (result) {
    await message.reply(`✅ Successfully transferred $${result.amount}!`);
  } else {
    await message.reply("❌ Transfer failed or timed out.");
  }
});
```

---

### 🎯 `messageCreate` Example – `watchNovaGolds`

```js
const { watchNovaGolds } = require("coinsnitch");

client.on("messageCreate", async (message) => {
  const options = {
    channel: message.channel,
    botId: "BOT_ID",
    userId: "USER_ID",
    amount: [5, 10, 20], // Pass single or multiple amounts
    timeout: 60000
  };

  const result = await watchNovaGolds(options);

  if (result) {
    await message.reply(`🌟 NovaGolds transfer of $${result.amount} confirmed!`);
  } else {
    await message.reply("❌ No matching NovaGolds transfer detected.");
  }
});
```

---

### 🎯 `messageCreate` Example – `watchCredits`

```js
const { watchCredits } = require("coinsnitch");

client.on("messageCreate", async (message) => {
  const options = {
    channel: message.channel,
    botId: "BOT_ID",
    userId: "USER_ID",
    amount: 10, // Can also be an array like [10, 20]
    timeout: 60000
  };

  const result = await watchCredits(options);

  if (result) {
    await message.reply(`💰 Credits transfer of $${result.amount} completed.`);
  } else {
    await message.reply("❌ Credits transfer not found.");
  }
});
```

---

## 🛠️ API Reference

Each watcher returns a Promise that resolves to an object or `false`.

### `watchNovaGolds(options)`

| Option      | Type             | Required | Description |
|-------------|------------------|----------|-------------|
| `channel`   | Channel           | ✅       | The channel to monitor |
| `botId`     | string            | ✅       | Bot ID expected to send the confirmation |
| `userId`    | string            | ✅       | Target user ID receiving the transfer |
| `amount`    | number \| number[]| ✅       | Amount(s) to match |
| `timeout`   | number            | ✅       | Timeout duration in milliseconds |

#### Returns:
```ts
Promise<{ message: Message, amount: number } | false>
```

### `watchCredits(options)` — Same as above  
### `watchLutexBits(options)` — Monitors `messageUpdate` events instead of new messages.

---

## 📁 Folder Structure

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
- ✅ Easily extendable for other types

---

## 📬 Feedback & Support

If you have any feedback, ideas, or bugs to report:

- 💬 [Join our Discord](https://dsc.gg/enexus)

---

## 📘 License

This project is licensed under the Apache License — see the [`LICENSE`](./LICENSE) file for details.