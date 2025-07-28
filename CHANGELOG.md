# Changelog

## [v1.0.4] - 2025-07-28

### 🚀 Added
- Support for passing multiple `amount` values as an array (`number[]`) instead of a single fixed value.
- Filters (`creditsFilter`, `novaGoldsFilter`, `lutexBitsFilter`) now return the **matched amount** instead of just `true`.
- Watcher functions (`watchCredits`, `watchNovaGolds`, `watchLutexBits`) now return an object:
  - `message`: the matched Discord message
  - `amount`: the exact amount that was matched in the message

### ✅ Modified
- Updated:
  - `creditsFilter.js`
  - `novaGoldsFilter.js`
  - `lutexBitsFilter.js`
  - `watchCredits.js`
  - `watchNovaGolds.js`
  - `watchLutexBits.js`

- Filters now detect whether `amount` is a single number or an array using `Array.isArray(amount)`.
- Amount matching is done using `.some()` or `for...of` loops to allow multiple values.

### 💡 Usage Examples (Post-Update)
```js
// Pass a single amount
await watchCredits({ amount: 10, ... });

// Or pass multiple values
await watchNovaGolds({ amount: [5, 10, 15], ... });
await watchLutexBits({ amount: [1, 2, 3], ... });
