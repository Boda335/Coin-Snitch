# Changelog

All notable changes to CoinSnitch will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.5.0] - 2026-01-30

### 🚀 Major Changes

#### Migrated to TypeScript
The entire project has been rewritten in TypeScript, providing full type safety and enhanced developer experience.

### ✨ Added

- **Full TypeScript Support**
  - Complete type definitions for all functions and interfaces
  - Exported TypeScript declaration files (`.d.ts`)
  - IntelliSense support in modern IDEs
  - Compile-time type checking

- **Type Definitions**
  - `WatchResult` interface for return types
  - `BaseWatchOptions` interface for common options
  - `NovaGoldsWatchOptions` interface
  - `CreditsWatchOptions` interface  
  - `LutexBitsWatchOptions` interface

- **Build System**
  - Added `tsconfig.json` for TypeScript configuration
  - Configured compilation output to `dist/` directory
  - Source maps generation for debugging
  - Declaration files generation

- **Development Improvements**
  - Better code organization under `src/` directory
  - Improved code maintainability with static typing
  - Enhanced error detection at compile time

### 🔄 Changed

- **Project Structure**
  - Migrated all `.js` files to `.ts` files
  - Reorganized source files under `src/` directory:
    - `src/filters/` - Filter implementations
    - `src/watchers/` - Watcher implementations
    - `src/utils/` - Utility functions
  - Compiled JavaScript output now in `dist/` directory

- **Package Configuration**
  - Updated `package.json` with TypeScript build scripts
  - Added `types` field pointing to declaration files
  - Updated entry points to compiled JavaScript
  - Added TypeScript as a dev dependency

- **Git Configuration**
  - Updated `.gitignore` for TypeScript artifacts:
    - `dist/` directory (build output)
    - `*.js` and `*.d.ts` in root (compiled files)
    - `.tsbuildinfo` (TypeScript incremental build cache)
    - Enhanced `node_modules` filtering

### 🛠️ Technical Details

- **TypeScript Version**: 5.x
- **Target**: ES2020
- **Module System**: CommonJS (for backwards compatibility)
- **Source Maps**: Enabled for debugging
- **Strict Mode**: Enabled for maximum type safety

### 📦 File Changes

#### Removed (JavaScript Source Files)
- All `.js` files in root and subdirectories
- Old structure without type definitions

#### Added (TypeScript Source Files)
- `src/index.ts` - Main entry point
- `src/index.d.ts` - Type declarations export
- `src/watchers/watchNovaGolds.ts`
- `src/watchers/watchCredits.ts`
- `src/watchers/watchLutexBits.ts`
- `src/filters/novaGoldsFilter.ts`
- `src/filters/creditsFilter.ts`
- `src/filters/lutexBitsFilter.ts`
- `src/utils/createMessageWatcher.ts`
- `tsconfig.json` - TypeScript configuration

### 🔧 Build Process

The new build process:
```bash
# Compile TypeScript to JavaScript
npm run build

# Output structure:
# dist/
# ├── index.js
# ├── index.d.ts
# ├── watchers/
# ├── filters/
# └── utils/
```

### 📝 Migration Guide

For users upgrading from v1.0.x to v1.5.0:

**JavaScript Users**: No breaking changes - everything works the same way:
```javascript
const { watchNovaGolds } = require('coinsnitch');
// Your existing code continues to work
```

**TypeScript Users**: Now with full type support:
```typescript
import { watchNovaGolds, WatchResult, NovaGoldsWatchOptions } from 'coinsnitch';

const options: NovaGoldsWatchOptions = {
  channel: textChannel,
  botId: '123',
  userId: '456',
  amount: [10, 20],
  timeout: 60000
};

const result: WatchResult | false = await watchNovaGolds(options);
```

### ⚠️ Breaking Changes

**None** - This is a backwards-compatible update. All existing JavaScript code will continue to work without modifications.

### 🐛 Bug Fixes

- Improved type inference preventing common runtime errors
- Better null/undefined handling with TypeScript strict mode
- Enhanced IDE autocomplete and error detection

### 📚 Documentation

- Completely rewritten README.md with TypeScript examples
- Added type documentation for all interfaces
- Improved code examples with type annotations
- Added advanced usage patterns

### 🔮 Future Plans

- [ ] ESM module support alongside CommonJS
- [ ] Additional currency types
- [ ] Custom filter builder utilities
- [ ] Performance optimizations
- [ ] Enhanced error messages with type hints

---

## [1.0.4] - 2025-01-28

### 🚀 Added
- Support for passing multiple `amount` values as an array (`number[]`) instead of a single fixed value
- Filters (`creditsFilter`, `novaGoldsFilter`, `lutexBitsFilter`) now return the **matched amount** instead of just `true`
- Watcher functions now return an object containing:
  - `message`: the matched Discord message
  - `amount`: the exact amount that was matched in the message

### ✅ Modified
- Updated all filter files:
  - `creditsFilter.js`
  - `novaGoldsFilter.js`
  - `lutexBitsFilter.js`
- Updated all watcher files:
  - `watchCredits.js`
  - `watchNovaGolds.js`
  - `watchLutexBits.js`
- Filters now detect whether `amount` is a single number or an array using `Array.isArray()`
- Amount matching is done using `.some()` or `for...of` loops to support multiple values

### 💡 Usage Examples
```js
// Pass a single amount
await watchCredits({ amount: 10, ... });

// Or pass multiple values
await watchNovaGolds({ amount: [5, 10, 15], ... });
await watchLutexBits({ amount: [1, 2, 3], ... });
```

---

## [1.0.0] - Initial Release

### ✨ Features
- Initial release of CoinSnitch
- Support for NovaGolds, Credits, and LutexBits
- Real-time transfer detection
- Message collection and update monitoring
- Configurable timeouts
- Modular filter system

---

**Full Changelog**: [View on GitHub](https://github.com/yourusername/coinsnitch/blob/main/CHANGELOG.md)