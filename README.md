# Teeny Tiny State TTS

[![npm](https://img.shields.io/npm/v/teeny-tiny-state)](https://www.npmjs.com/package/teeny-tiny-state)
![bundle size](https://bundlephobia.com/package/teeny-tiny-state)

A teeny tiny reactive state **utility** for JavaScript — lighter than a feather (0.5 KB).

Minimal, fun, and only what you really need to make your state reactive.

---

## ✨ Features

- 🪶 Super lightweight & minimal
- 🔄 Reactive state with automatic updates
- 📦 Works with objects and arrays
- 🌐 Supports both ESM and UMD (browser <script> ready)

## 🚀 Usage

### With ES Modules

```js
import { reactive, effect } from "teeny-tiny-state";

const state = reactive({ count: 0 });

effect(() => {
  console.log("Count is:", state.count);
});

state.count++; // triggers effect -> "Count is: 1"
```

---

### With Arrays

```js
import { reactive, effect } from "teeny-tiny-state";

const state = reactive({ items: [] });

effect(() => {
  console.log("Items:", state.items.join(", "));
});

state.items.push("Hello"); // Items: Hello
state.items.push("World"); // Items: Hello, World
```

---

### In the Browser

```js
<script src="./dist/teeny-tiny-state.umd.js"></script>
<script>
  const { reactive, effect } = TeenyTinyState;

  const state = reactive({ count: 0 });

  effect(() => {
    document.body.textContent = `Count: ${state.count}`;
  });

  setInterval(() => state.count++, 1000);
</script>
```

---

### With cleanup

```js
import { reactive, effect } from "teeny-tiny-state";

const state = reactive({ count: 0 });

effect(() => {
  const timer = setInterval(() => {
    console.log("Tick:", state.count);
  }, 1000);

  return () => clearInterval(timer);
});

state.count++;
```

### 🛠 API

reactive(object)

Wraps an object or array into a reactive proxy.
All reads and writes will be tracked automatically.

effect(fn)

Registers a reactive effect function.
The function will automatically re-run whenever its dependencies change.
